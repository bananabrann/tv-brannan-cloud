import { Configuration, OpenAIApi } from "openai";
import {
  OPENAI_API_KEY,
  OPENAI_ORGANIZATION_ID,
  AZURE_STORAGE_ACCOUNT_NAME,
  AZURE_STORAGE_SAS_TOKEN,
  WHITELISTED_USERS
} from "$env/static/private";
import { BlobServiceClient } from "@azure/storage-blob";

import contextPrompt from "./contextPrompt.json";
import type { AxiosError } from "axios";
import { getUniqueId } from "$lib/utils";
import type ChatMessage from "$lib/types/ChatMessage.interface";
import { error } from "@sveltejs/kit";
import { version } from "$app/environment";
import { Readable } from "stream";

const containerName = "tv-queries";
const blobName = "logs.txt";

const blobServiceClient = new BlobServiceClient(
  `https://${AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net?${AZURE_STORAGE_SAS_TOKEN}`
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
  // Check if user is from a whitelisted IP
  /*
  if (WHITELISTED_USERS.split(" ").filter((x) => x === ip).length < 1) {
    console.log(`User IP "${ip}" attempted to send a message, but is not whitelisted.`);

    return {
      role: "system",
      content: "Error 403: User is not grandma"
    } as ChatMessage;
  }
  */

  createLogEntry(message, ip);

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
    throw error(500, { message: "Unknown error while sending to ChatGPT." });
  }
}

function createLogEntry(message: string, ip: string = "none"): string {
  const timestamp = new Date().toUTCString();
  appendLineAndUpdate().catch(console.error);
  console.log("logged");
  return `${timestamp} <${ip}@${agentSessionId}/${version}> ${message}`;
}

const appendLineAndUpdate = async () => {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobClient = containerClient.getBlockBlobClient(blobName);

  const downloadResponse = await blobClient.download(0);
  let fileContent =
    (await streamToString(downloadResponse.readableStreamBody)) + "\nAppended line.";

  const uploadStream = Readable.from([fileContent]);
  await blobClient.uploadStream(uploadStream, fileContent.length);
};

const streamToString = async (readableStream: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    const chunks: Array<any> = [];
    readableStream.on("data", (data: any) => {
      chunks.push(data.toString());
    });
    readableStream.on("end", () => {
      resolve(chunks.join(""));
    });
    readableStream.on("error", reject);
  });
};
