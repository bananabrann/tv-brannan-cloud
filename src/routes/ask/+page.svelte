<script lang="ts">
  import Chatbox from "$lib/components/Chatbox.svelte";
  import type { MessageBlock as Message } from "$lib/types/MessageBlock";

  export let data;

  let messages: Message[] = [];
  let inputTextMessage: string = "";

  async function sendMessage() {
    console.log("TBD")
  }
</script>

<h2>Find a show or ask a question</h2>

<Chatbox bind:inputTextMessage bind:messages {sendMessage} />

<!-- <form action="?/send" method="POST">
  <label for="question"
    >Question
    <input type="text" autocomplete="off" id="question" name="question-content" />
  </label>
  <button type="submit">Send message</button>
</form> -->
<small>Chatting with agent <b>{data.agentSessionId}</b></small>
