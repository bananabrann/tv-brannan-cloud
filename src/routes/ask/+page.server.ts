import { WHITELISTED_USERS } from "$env/static/private";
import { agentSessionId, sendMessage } from "$lib/server/chat";
import { ActionFailure, fail } from "@sveltejs/kit";
import initialPrompt from "$lib/server/contextPrompt.json";
import type ChatMessage from "$lib/types/ChatMessage.interface";
import MessageBlock from "$lib/components/MessageBlock.svelte";

const SESSION_STORAGE_CHAT_HISTORY_KEY = "chat-history";

export function load({ getClientAddress, request }) {
  // Check if client is on a whitelist of IPs
  // console.log(`Connected to ${getClientAddress()}`);

  const clientIp = getClientAddress();

  return {
    isWhiteListed: WHITELISTED_USERS.includes(clientIp),
    agentSessionId: agentSessionId
  };
}

export const actions = {
  send: async ({ cookies, request, getClientAddress }) => {
    const data: FormData = await request.formData();
    const prompt = data.get("question-content")?.toString();

    // Message content must be present
    if (!prompt) throw new Error("Prompt is undefined");

    try {
      const response = await sendMessage(prompt, [], getClientAddress());
      
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

  // TODO - delete agent when user leaves the page.
};

/*
function verifySessionStorage() {
  const data = window.sessionStorage.getItem(SESSION_STORAGE_CHAT_HISTORY_KEY);

  if (!data) {
    window.sessionStorage.setItem(
      SESSION_STORAGE_CHAT_HISTORY_KEY,
      JSON.stringify([{ content: initialPrompt.text, role: "system" }])
    );
  }
}

function addMessageToSessionStorage(message: ChatMessage) {
  verifySessionStorage();

  const data = window.sessionStorage.getItem(SESSION_STORAGE_CHAT_HISTORY_KEY);

  if (!data) throw new Error("Session storage is undefined.");

  const chatHistory = JSON.parse(data) as ChatMessage[];

  chatHistory.push(message);

  window.sessionStorage.setItem(SESSION_STORAGE_CHAT_HISTORY_KEY, JSON.stringify(chatHistory));
}
*/