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
  const downloaded: Promise<unknown> = (await streamToBuffer(
    downloadResponse.readableStreamBody as unknown as ReadableStream
  )) as Promise<unknown>;

  return downloaded.toString();
}

// TODO - Add type handling.
export async function streamToBuffer(readableStream: ReadableStream): Promise<unknown> {
  return new Promise((resolve, reject) => {
    //@ts-ignore
    const chunks = [];
    //@ts-ignore
    readableStream.on("data", (data) => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });
    //@ts-ignore
    readableStream.on("end", () => {
      //@ts-ignore
      resolve(Buffer.concat(chunks));
    });
    //@ts-ignore
    readableStream.on("error", reject);
  });
}
