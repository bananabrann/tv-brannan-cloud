<script lang="ts">
  import type ChatMessage from "$lib/types/ChatMessage.interface";
  import { enhance } from "$app/forms";
  import MessageBlock from "$lib/components/MessageBlock.svelte";
  import { afterUpdate } from "svelte";

  export let data;

  let element: HTMLElement;

  let messages: ChatMessage[] = [];
  let inputTextMessage: string = "";

  let isCreating = false;

  function addMessageToArray(message: ChatMessage) {
    messages = [...messages, message];
    console.log(messages);
  }

  const scrollToBottom = async (node: HTMLElement) => {
    node.scroll({ top: node.scrollHeight, behavior: "smooth" });
  };

  afterUpdate(() => {
    if (messages.length > 0) {
      const chatbox = document.getElementById("chatbox");
      if (messages.length > 0) scrollToBottom(chatbox as HTMLElement);
    }
  });

  $: if (messages.length > 1 && element) {
    scrollToBottom(element);
  }
</script>

<h2>Find a show or ask a question</h2>

<hr />

<section id="chatbox" bind:this={element}>
  <MessageBlock
    message={{
      role: "assistant",
      content: `Hi 😀, I'm your chatbot. I can help you find where a TV show or movie is, or try to answer any questions you may have. Simply type the name of the show you're looking for, or ask your question. I'm able to hold a conversation! `
    }}
  />
  <MessageBlock
    message={{
      role: "assistant",
      content: `Keep in mind, I may be wrong and do not know information after September, 2021.`
    }}
  />

  {#each messages as message}
    <!-- <p>{message.content}</p> -->
    <MessageBlock {message} />
  {/each}

  {#if isCreating}
    <p id="robot-is-typing"><code>The robot is typing...</code></p>
  {/if}
</section>

<section id="bottom-area">
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

    <button id="chat-submit-button" type="submit" disabled={isCreating}>Send message</button>
  </form>
</section>

<!-- <Chatbox bind:inputTextMessage bind:messages {sendMessage} /> -->

<br />

<small>Chatting with agent <code>{data.agentSessionId}</code></small>

<style lang="scss">
  $breakpoint: 500px;

  #chatbox {
    z-index: 1;
    margin: 0 auto;
    max-width: 1080px;
    height: 60vh;
    overflow-y: scroll;
    @include nice-scroll();
  }

  form {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    max-width: 850px;
    margin: 0 auto;

    @media screen and (max-width: $breakpoint) {
      flex-direction: column;
      justify-content: flex-end;
    }

    input {
      width: 90%;
      max-width: 600px;
    }

    button {
      min-width: 160px;
      margin: 0 10px;

      @media screen and (max-width: $breakpoint) {
        font-size: 0.9rem;
      }
    }
  }

  #message-history {
    display: none;
  }

  #robot-is-typing {
    text-align: center;
    margin-bottom: 2rem;
  }

  #bottom-area {
    position: relative;
    -webkit-box-shadow: 0px -5px 16px 0px $dark-color;
    -moz-box-shadow: 0px -5px 16px 0px $dark-color;
    box-shadow: 0px -22px 20px 0px $dark-color;
  }
</style>
