import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY, OPENAI_ORGANIZATION_ID, WHITELISTED_USERS } from "$env/static/private";
import initialPrompt from "./contextPrompt.json";
import { fail } from "@sveltejs/kit";
import axios, { AxiosError } from "axios";
import { getUniqueId } from "$lib/utils";
import type ChatMessage from "$lib/types/ChatMessage.interface";

export const agentSessionId = getUniqueId();
console.log(`Starting chat agent ${agentSessionId}...`);

const configuration = new Configuration({
  organization: OPENAI_ORGANIZATION_ID,
  apiKey: OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

// Array of chat agents. This is so that we can have multiple chat agents
// at the same time. I do this so that we can have multiple chat agents
// running at the same time. It shouldn't happen, but it's good to be
// prepared.
// let messageStores: Array<MessageStore> = [];

// Send a message to the OpenAI API. Returns the response message.
export async function sendMessage(message: string, history: ChatMessage[] = [], ip: string = "") {
  // Check if user is from a whitelisted IP
  if (!WHITELISTED_USERS.includes(ip)) {
    console.log(`User IP "${ip}" attempted to send a message, but is not whitelisted.`);

    return fail(403, {
      error: "Forbidden",
      description: "User is not grandma."
    });
  }
  try {
    return await openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [...history, { role: "user", content: message }]
      })
      .then((res) => {
        const responseMessage = res?.data?.choices[0]?.message?.content;
        // console.log(responseMessage);
        return {
          role: "assistant",
          content: responseMessage
        } as ChatMessage;
      });
  } catch (error: unknown | AxiosError | Error) {
    const failMessage = "Failed to send message to ChatGPT.";

    // Check if Axios error
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data?.error?.code);

      return fail(500, {
        error: error.response?.data?.error?.code ?? error,
        description: failMessage
      });

      // Just a stock error
    } else {
      return fail(500, {
        error: error instanceof Error ? error.message : "Unknown error.",
        description: failMessage
      });
    }
  }
}
