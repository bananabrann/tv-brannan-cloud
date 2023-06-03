
import { initializeChatGPT } from "$lib/server/chat";

export function load({ getClientAddress, request }) {
  // Check if client is on a whitelist of IPs
  console.log(`Connected to ${getClientAddress()}`);

  initializeChatGPT();
}
