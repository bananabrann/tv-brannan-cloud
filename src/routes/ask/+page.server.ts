
import { createChatAgent, sendMessageByAgentId } from "$lib/server/chat";
import { fail } from "@sveltejs/kit"

export function load({ getClientAddress, request }) {
  // Check if client is on a whitelist of IPs
  console.log(`Connected to ${getClientAddress()}`);

  const chatAgentId = createChatAgent();
  console.log(`ChatAgent ID: ${chatAgentId}`);

  // dev ---
  sendMessageByAgentId("Hello", chatAgentId);

  // -------

  return {
    chatAgentId: chatAgentId
  }

}

export const actions = {
  send: async ({ cookies, request }) => {
    const data: FormData = await request.formData();
    const prompt = data.get("question-content")?.toString();

    // Message content must be present
    if (!prompt) throw new Error("Prompt is undefined")

    try {
      // Make OpenAI API call

    } catch (error) {
      return fail(500,
        {
          error: error instanceof Error ? error.message : "Unknown error.",
          description: "An error occurred while making the API call."
        }
      )
    }

  }

  // TODO - delete agent when user leaves the page.

}
