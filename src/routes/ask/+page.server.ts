import { WHITELISTED_USERS } from "$env/static/private";
import { agentSessionId, sendMessage } from "$lib/server/chat";
import { isAChatMessage } from "$lib/types/ChatMessage.interface";
import type { ActionFailure } from "@sveltejs/kit";
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
    //
    // This shouldn't throw a new error. Instead, return ActionFailure or error(). (error()
    // from sveltekit is expected errors.)
    // if (!prompt) throw new Error("Prompt is undefined");

    const response: ChatMessage | ActionFailure<any> = await sendMessage(
      // @ts-ignore
      prompt,
      messageHistory,
      getClientAddress()
    );

    if (isAChatMessage(response)) {
      return {
        status: 200,
        success: true,
        message: {
          role: "assistant",
          content: response
        }
      };
    } else {
      console.error(
        "ActionFailure detected in ask/+page.server.ts. There is probably additional output."
      );

      return {
        status: response.status,
        success: false,
        message: {
          role: "system",
          content: `Error ${response.status}: ${response.data.description}}`
        }
      };
    }
  }
};
