<script lang="ts">
  export let data;

  // ChatMessage interface for storing chat messages from OpenAI API.
  // "user" is messages from the human, "assistant" is the response from
  // ChatGPT, and "system" is the initial prompt or additional context.
  interface ChatMessage {
    role: "user" | "system" | "assistant";
    content: string;
  }

  

  function deleteMessageGroup() {
    console.log(`deleteMessageGroup called on ${sessionId}, but function is not implemented yet`);
  }
</script>

<h2>Ask a question</h2>

<form action="?/send" method="POST">
  <label for="question"
    >Question
    <input type="text" autocomplete="off" id="question" name="question-content" />
  </label>
  <button type="submit" on:click|once={data.createChatAgent}>Send message</button>
</form>

{#if data.chatAgentId}
  <small>Chatting with agent <b>{data.chatAgentId}</b></small>
  <small>Session ID <b>{sessionId}</b></small>
{/if}

<svelte:window on:beforeunload={deleteMessageGroup} />
