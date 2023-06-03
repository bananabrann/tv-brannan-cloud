// ChatMessage interface for storing chat messages from OpenAI API.
// "user" is messages from the human, "assistant" is the response from
// ChatGPT, and "system" is the initial prompt or additional context.
export default interface ChatMessage {
  role: "user" | "system" | "assistant";
  content: string;
}
