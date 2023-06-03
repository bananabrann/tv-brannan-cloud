import { WHITELISTED_USERS } from "$env/static/private";
import { sendMessage } from "$lib/server/chat";
import { fail } from "@sveltejs/kit";
import initialPrompt from "$lib/server/contextPrompt.json";

export function load({ getClientAddress, request }) {
  // Check if client is on a whitelist of IPs
  // console.log(`Connected to ${getClientAddress()}`);

  const clientIp = getClientAddress();

  return {
    isWhiteListed: WHITELISTED_USERS.includes(clientIp)
  };
}

export const actions = {
  send: async ({ cookies, request, getClientAddress }) => {
    const data: FormData = await request.formData();
    const prompt = data.get("question-content")?.toString();

    // Message content must be present
    if (!prompt) throw new Error("Prompt is undefined");

    try {
      // Make OpenAI API call
      const response = await sendMessage(prompt, [], getClientAddress());
    } catch (error) {
      return fail(500, {
        error: error instanceof Error ? error.message : "Unknown error.",
        description: "An error occurred while making the API call."
      });
    }
  }

  // TODO - delete agent when user leaves the page.
};

function addInitialMessage() {
  // TODO - add initial message
}
