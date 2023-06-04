<script lang="ts">
  import type { MessageBlock as Message } from "$lib/types/MessageBlock";
  import MessageBlock from "$lib/components/MessageBlock.svelte";
  export let inputTextMessage: String;
  export let messages: Message[];
  export let sendMessage: () => void;
</script>

<div class="chatbox">
  <div class="messages">
    {#each messages as message}
      <MessageBlock {message} />
    {/each}
  </div>

  <form action="" class="" on:submit|preventDefault={sendMessage}>
    <input
      type="text"
      autocomplete="off"
      id="question"
      name="question-content"
      bind:value={inputTextMessage}
    />
    <button type="submit">Send message</button>  
  </form>
</div>
