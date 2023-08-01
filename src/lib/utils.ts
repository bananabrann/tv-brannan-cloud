//@ts-nocheck

import type { BlobDownloadResponseParsed, ContainerClient } from "@azure/storage-blob";

export function getUniqueId() {
  return Math.random().toString(36).substring(7);
}

export async function createBlobFromString(
  client: ContainerClient,
  blobName: string,
  fileContentsAsString: string
) {
  const blockBlobClient = await client.getBlockBlobClient(blobName);

  await blockBlobClient.upload(fileContentsAsString, fileContentsAsString.length);
  console.log(`created blob ${blobName}`);
}

export async function downloadBlobToString(
  containerClient: ContainerClient,
  blobName: string
): Promise<string> {
  const blobClient = containerClient.getBlobClient(blobName);

  const downloadResponse: BlobDownloadResponseParsed = await blobClient.download();

  // TODO - Add type handling.
  const downloaded = await streamToBuffer(
    downloadResponse.readableStreamBody as unknown as ReadableStream
  );

  // ts-ignore
  return downloaded.toString();
}

// TODO - Add type handling.
export async function streamToBuffer(readableStream: ReadableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on("data", (data) => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });
    readableStream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });

    readableStream.on("error", reject);
  });
}
