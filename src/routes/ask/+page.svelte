<script lang="ts">
  import Chatbox from "$lib/components/Chatbox.svelte";
  // import type { MessageBlock as Message } from "$lib/types/MessageBlock";
  import type ChatMessage from "$lib/types/ChatMessage.interface";
  // import type ChatMessage from "$lib/types/ChatMessage.interface.js";
  import { enhance } from "$app/forms";
  import { getUniqueId } from "$lib/utils.js";

  export let data;

  let messages: ChatMessage[] = [];
  let inputTextMessage: string = "";

  let isCreating = false;

  function addMessageToArray(message: ChatMessage) {
    messages = [...messages, message];
    console.log(messages);
  }
</script>

<h2>Find a show or ask a question</h2>

{#each messages as message}
  <p>{message.content}</p>
{/each}

<form
  action="?/send"
  method="POST"
  class=""
  use:enhance={() => {
    isCreating = true;
    addMessageToArray({
      role: "user",
      content: inputTextMessage
    });

    return async ({ update, result }) => {
      await update();
      isCreating = false;

      // TODO - Make type safe
      addMessageToArray({
        // @ts-ignore
        role: result.data.message.content.role,
        // @ts-ignore
        content: result.data.message.content.content
      });
    };
  }}
>
  <input
    type="text"
    autocomplete="off"
    id="question"
    name="question-content"
    disabled={isCreating}
    required
    bind:value={inputTextMessage}
    on:change={(event) => {}}
  />

  <!-- Message history to provide memory to ChatGPT. This is invisible to the user. -->
  <textarea name="message-history" id="message-history" cols="30" rows="10">
    {JSON.stringify(messages)}
  </textarea>

  <button type="submit">Send message</button>
</form>

<!-- <Chatbox bind:inputTextMessage bind:messages {sendMessage} /> -->

<small>Chatting with agent <code>{data.agentSessionId}</code></small>

<style>
  #message-history {
    display: none;
  }
</style>
