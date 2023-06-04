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

// ChatAgent class for interacting with the OpenAI API.
/*
class MessageStore {
  private id: string;
  private messages: Array<ChatMessage>;

  constructor() {
    try {
      this.id = Math.random().toString(36).substring(7);
      this.messages = [];

      // Adds the initial prompt to the messages array
      this.addMessage(initialPrompt.text, "system");
    } catch (error) {
      console.log(error);
      throw new Error("Failed to initialize ChatAgent");
    }
  }

  // Send a message to the OpenAI API.
  async sendMessage(message: string, ip: string = "") {
    // Check if user is from a whitelisted IP
    if (!WHITELISTED_USERS.includes(ip)) {
      return fail(403, {
        error: "Forbidden",
        description: "User is not grandma."
      });
    }

    this.addMessage(message, "user");

    try {
      await openai
        .createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: this.getMessages()
        })
        .then((res) => {
          const responseMessage = res?.data?.choices[0]?.message?.content;
          console.log(responseMessage);
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

  // Add message to the local memory of messages in order to provide
  // context to ChatGPT.
  addMessage(message: string, role: "user" | "assistant" | "system") {
    const messageObject: ChatMessage = {
      role: role,
      content: message
    };

    this.messages.push(messageObject);
  }

  // Getter and setters.

  getMessages() {
    return this.messages;
  }
  getId() {
    return this.id;
  }

  // TODO - delete agent when user leaves the page.
}
*/

// export function createChatAgent() {
//   console.log("Initializing new ChatAgent...");
//   const agent = new ChatAgent();
//   agents.push(agent);
//   console.log(`Agents on: ${agents.length}`);

//   return agent.getId();
// }

/*
export function sendMessageBySoreId(message: string, storeId: string) {
  const agent = agents.find((store) => store.getId() === storeId);
  if (!agent) throw new Error("ChatAgent not found");

  agent.sendMessage(message);
  // console.log(`Sending message to ChatGPT: ${message}`);
}
*/
