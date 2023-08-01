import { version } from "$app/environment";
import {
  AZURE_STORAGE_CONNECTION_STRING,
  OPENAI_API_KEY,
  OPENAI_ORGANIZATION_ID
} from "$env/static/private";
import type ChatMessage from "$lib/types/ChatMessage.interface";
import { createBlobFromString, downloadBlobToString, getUniqueId } from "$lib/utils";
import type { AxiosError } from "axios";
import moment from "moment";
import { Configuration, OpenAIApi } from "openai";

import { BlobServiceClient } from "@azure/storage-blob";
import { error } from "@sveltejs/kit";

import contextPrompt from "./contextPrompt.json";

console.log("Initializing Azure Blob Storage...");

const storageClient: BlobServiceClient = BlobServiceClient.fromConnectionString(
  AZURE_STORAGE_CONNECTION_STRING
);

export const agentSessionId = getUniqueId();

console.log(`Starting chat agent ${agentSessionId}...`);

const configuration = new Configuration({
  organization: OPENAI_ORGANIZATION_ID,
  apiKey: OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

// Send a message to the OpenAI API. Returns the response message.
export async function sendMessage(message: string, history: ChatMessage[] = [], ip: string = "") {
  
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
        
        createLogEntry(message, ip);

        return {
          role: "assistant",
          content: responseMessage
        } as ChatMessage;
      });
  } catch (err: unknown | AxiosError | Error) {
    throw error(500, { message: String(err) });
  }
}

async function createLogEntry(message: string, ip: string = "none"): Promise<void> {
  const date = moment.utc();
  const timestamp = date.utcOffset("-05:00").format("YYYY/MM/DD HH:mm [GMT]Z");
  const entry = `${timestamp} <${ip}@${agentSessionId}/${version}> ${message}`;
  const containerClient = storageClient.getContainerClient("tv-files");
  const blobName = "tv-chat.logs.txt";
  const existingLogs: string = await downloadBlobToString(containerClient, blobName);
  const newContent: string = existingLogs + "\n" + entry;

  createBlobFromString(containerClient, blobName, newContent);
}
