import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY, OPENAI_ORGANIZATION_ID, WHITELISTED_USERS } from "$env/static/private";
import contextPrompt from "./contextPrompt.json";
import type { AxiosError } from "axios";
import { getUniqueId } from "$lib/utils";
import type ChatMessage from "$lib/types/ChatMessage.interface";
import { error } from '@sveltejs/kit';


export const agentSessionId = getUniqueId();
console.log(`Starting chat agent ${agentSessionId}...`);

const configuration = new Configuration({
  organization: OPENAI_ORGANIZATION_ID,
  apiKey: OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

// Send a message to the OpenAI API. Returns the response message.
export async function sendMessage(message: string, history: ChatMessage[] = [], ip: string = "") {
  // Check if user is from a whitelisted IP
  if (WHITELISTED_USERS.split(' ').filter((x) => x === ip).length < 1 ) {
    console.log(`User IP "${ip}" attempted to send a message, but is not whitelisted.`);

    return {
      role: "system",
      content: "Error 403: User is not grandma"
    }  as ChatMessage
  }

  try {
    return await openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: contextPrompt.text }, // Context prompt.
          ...history, // Chat history.
          { role: "user", content: message } // User's message.
        ]
      })
      .then((res) => {
        const responseMessage = res?.data?.choices[0]?.message?.content;
        // console.log(responseMessage);
        return {
          role: "assistant",
          content: responseMessage
        } as ChatMessage;
      });
  } catch (err: unknown | AxiosError | Error) {
    throw error(500, {message: "Unknown error while sending to ChatGPT."});
  }
}
