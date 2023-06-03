<script lang="ts">
  import type { MessageBlock } from "$lib/types/MessageBlock";
  export let message: MessageBlock;
</script>

<div class="message-block {message.isUser ? 'user-message' : 'robot-message'}">
  <div>
    {#if message.isLoading}
      <p>...</p>
    {:else}
      {message.text}
    {/if}
  </div>
</div>
