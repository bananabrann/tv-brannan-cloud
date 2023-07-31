import { version } from "$app/environment";
import {
  AZURE_STORAGE_ACCOUNT_NAME,
  AZURE_STORAGE_SAS_TOKEN,
  OPENAI_API_KEY,
  OPENAI_ORGANIZATION_ID
} from "$env/static/private";
import type ChatMessage from "$lib/types/ChatMessage.interface";
import { getUniqueId } from "$lib/utils";
import type { AxiosError } from "axios";
import moment from "moment";
import { Configuration, OpenAIApi } from "openai";
import { Readable } from "stream";

import { BlobServiceClient } from "@azure/storage-blob";
import { error } from "@sveltejs/kit";

import contextPrompt from "./contextPrompt.json";

const containerName = "tv-queries";
const blobName = "logs.txt";

console.log("Initializing Azure Blob Storage...");

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

  // creating a log entry is definitely causing the 500 error
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
        return {
          role: "assistant",
          content: responseMessage
        } as ChatMessage;
      });
  } catch (err: unknown | AxiosError | Error) {
    throw error(500, { message: String(err) });
  }
}

function createLogEntry(message: string, ip: string = "none"): void {
  console.log("createLogEntry");

  let date = moment.utc();
  let timestamp = date.utcOffset("-05:00").format("YYYY/MM/DD HH:mm [GMT]Z");

  const entry = `${timestamp} <${ip}@${agentSessionId}/${version}> ${message}`;

  try {
    appendLineAndUpdate(entry);
  } catch (err: unknown) {
    console.error(err);
  }
}

async function appendLineAndUpdate(message: string) {
  console.log("appendLineAndUpdate start");

  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobClient = containerClient.getBlockBlobClient(blobName);

  console.log("Attempting to download blob...");
  const downloadResponse = await blobClient.download(0);

  if (!downloadResponse.readableStreamBody) {
    console.error("Failed to download blob or blob was empty");
    return;
  }

  let fileContent = (await streamToString(downloadResponse.readableStreamBody)) + "\n" + message;

  console.log("Attempting to upload blob...");
  const uploadStream = Readable.from([fileContent]);
  await blobClient.uploadStream(uploadStream, fileContent.length);
  console.log("Blob uploaded successfully");
}

async function streamToString(readableStream: NodeJS.ReadableStream): Promise<string> {
  console.log("streamToString");

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
}
