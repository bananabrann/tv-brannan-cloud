// ChatMessage interface for storing chat messages from OpenAI API.
// "user" is messages from the human, "assistant" is the response from
// ChatGPT, and "system" is the initial prompt or additional context.
export default interface ChatMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

// Type guard for ChatMessage interface.
export function isAChatMessage(object: any): object is ChatMessage {
  return (
    typeof object === "object" &&
    object !== null &&
    typeof object.role === "string" &&
    typeof object.content === "string"
  );
}
