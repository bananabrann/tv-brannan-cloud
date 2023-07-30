<script lang="ts">
  import type ChatMessage from "$lib/types/ChatMessage.interface";
  import type MagicButtonProps from "$lib/types/MagicButtonProps.interface.js";
  import { isValidMagicButtonServiceProvider } from "$lib/types/MagicButtonProps.interface.js";
  import { enhance } from "$app/forms";
  import MessageBlock from "$lib/components/MessageBlock.svelte";
  import { afterUpdate } from "svelte";
  import MagicButton from "$lib/components/MagicButton.svelte";

  export let data;

  let element: HTMLElement;
  let messages: ChatMessage[] = [];
  let inputTextMessage: string = "";
  let isCreating = false;
  let isShowingMagicButton = false;
  let MagicButtonProps: MagicButtonProps;

  console.log(`Client IP: ${data.clientIp}\nChatting with agent ${data.agentSessionId}`);

  $: if (messages.length > 1 && element) {
    scrollToBottom(element);
  }

  function addMessageToArray(message: ChatMessage) {
    messages = [...messages, message];
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

  function determineMagicButton(message: ChatMessage) {
    if (message?.content?.includes("SERVICE<")) {
      const service = message.content.split("<")[1].split(">")[0];
      const showName = message.content.split("<")[2].split(">")[0];

      if (isValidMagicButtonServiceProvider(service.toLowerCase())) {
        isShowingMagicButton = true;
        MagicButtonProps = {
          provider: service.toLowerCase() as MagicButtonProps["provider"],
          showName: showName.toLowerCase() as MagicButtonProps["showName"]
        };
      }

      // Remove SERVICE<...> and SHOWNAME<...> from message
      const newMessage = message.content
        .replace(`SERVICE<${service}>`, "")
        .replace(`SHOWNAME<${showName}>`, "");

      // Replace message in messages array.
      messages = messages.map((m) => {
        if (m.content === message.content) {
          return {
            ...m,
            content: newMessage
          };
        } else {
          return m;
        }
      });
    }
  }
</script>

<br />

<content>
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
        content: `Keep in mind, I may be wrong and do not know information after September, 2021. By sending a message, you understand and consent that I log your messages and other information to ensure no abuse occurs.`
      }}
    />

    {#each messages as message}
      <MessageBlock {message} />
    {/each}

    {#if isCreating}
      <p id="robot-is-typing"><code>The robot is typing...</code></p>
    {/if}
  </section>

  <section id="bottom-area">
    <br />

    {#if isShowingMagicButton}
      <MagicButton {MagicButtonProps} />
    {/if}

    <form
      action="?/send"
      method="POST"
      class=""
      use:enhance={() => {
        isCreating = true;
        isShowingMagicButton = false;
        addMessageToArray({
          role: "user",
          content: inputTextMessage
        });

        return async ({ update, result }) => {
          isCreating = false;

          await update();

          // TODO - Add type checking.
          //@ts-ignore
          console.log(result.data.message);

          addMessageToArray({
            // @ts-ignore
            role: result.data.message.role,
            // @ts-ignore
            content: result.data.message.content
          });

          // @ts-ignore
          if (result.data.success) {
            // @ts-ignore
            determineMagicButton(result.data.message);
          }
        };
      }}
    >
      <!-- svelte-ignore a11y-autofocus -->
      <input
        type="text"
        autocomplete="off"
        id="question"
        name="question-content"
        disabled={isCreating}
        required
        bind:value={inputTextMessage}
        autofocus
      />

      <!-- Message history to provide memory to ChatGPT. This is invisible to the user. -->
      <textarea name="message-history" id="message-history" cols="30" rows="10">
        {JSON.stringify(messages)}
      </textarea>

      <button id="chat-submit-button" type="submit" disabled={isCreating}>Send message</button>
    </form>
  </section>
</content>

<br />

<style lang="scss">
  $breakpoint: 500px;
  $bottom-area-height: 150px;

  #chatbox {
    @include nice-scroll();
    z-index: 1;
    margin: 0 auto;
    max-width: 1080px;
    height: 60vh;
    overflow-y: scroll;
    padding-bottom: $bottom-area-height;
    display: flex;
    flex-direction: column;
    align-items: normal; // explicit default
    gap: 2rem;

    // media query for less than breakpoint
    @media screen and (max-width: $breakpoint) {
      gap: 0.5rem;
    }
  }

  form {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    max-width: 850px;
    margin: 0 auto;
    width: 80%;

    @media screen and (max-width: $breakpoint) {
      flex-direction: column;
      justify-content: flex-end;
    }

    input {
      width: 80%;
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
  }

  #bottom-area {
    position: fixed;
    bottom: 0;
    margin: 0 auto;
    right: 0;
    left: 0;
    z-index: 10;
    height: $bottom-area-height;
    background-color: $dark-color;

    -webkit-box-shadow: 0px -5px 16px 0px $dark-color;
    -moz-box-shadow: 0px -5px 16px 0px $dark-color;
    box-shadow: 0px -22px 20px 0px $dark-color;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
