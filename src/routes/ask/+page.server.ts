import { WHITELISTED_USERS } from "$env/static/private";
import { agentSessionId, sendMessage } from "$lib/server/chat";
import { fail } from "@sveltejs/kit";
import type ChatMessage from "$lib/types/ChatMessage.interface";

// const SESSION_STORAGE_CHAT_HISTORY_KEY = "chat-history";

export function load({ getClientAddress, request }) {
  const clientIp = getClientAddress();

  return {
    isWhiteListed: WHITELISTED_USERS.includes(clientIp),
    agentSessionId: agentSessionId
  };
}

export const actions = {

  // Send a message to the OpenAI API. Returns the response message.
  send: async ({ cookies, request, getClientAddress }) => {
    const data: FormData = await request.formData();
    const prompt = data.get("question-content")?.toString();
    const messageHistory: ChatMessage[] = JSON.parse(
      data.get("message-history")?.toString() ?? "[]"
    );

    // Message content must be present. There's client-side validation, but this is just
    // in case the user is doing something hacky.
    if (!prompt) throw new Error("Prompt is undefined");

    try {
      const response = await sendMessage(prompt, messageHistory, getClientAddress());

      return {
        status: 200,
        success: true,
        message: {
          role: "assistant",
          content: response
        }
      };
    } catch (error) {
      return fail(500, {
        error: error instanceof Error ? error.message : "Unknown error.",
        description: "An error occurred while making the API call."
      });
    }
  }
};
