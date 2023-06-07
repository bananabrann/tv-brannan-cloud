<script lang="ts">
  import type MagicButtonProps from "$lib/types/MagicButtonProps.interface";
  import { fly } from "svelte/transition";

  export let MagicButtonProps: MagicButtonProps;

  let redirectUrl: string;

  $: redirectUrl =
    MagicButtonProps.provider === "netflix"
      ? `https://netflix.com/search?q=${replaceSpaces(MagicButtonProps.showName)}`
      : MagicButtonProps.provider === "hulu" // TODO - add support for Hulu
      ? `https://hulu.com/search?q=${replaceSpaces(MagicButtonProps.showName)}`
      : MagicButtonProps.provider === "paramount+" // TODO - add support for Paramount+
      ? `https://paramountplus.com/search/${replaceSpaces(MagicButtonProps.showName)}`
      : MagicButtonProps.provider === "youtube"
      ? `https://www.youtube.com/results?search_query=${replaceSpaces(MagicButtonProps.showName)}`
      : "";

  // Replaces spaces from chat message text with URL-friendly %20.
  function replaceSpaces(str: string) {
    return str.replace(/\s/g, "%20");
  }

  function performRedirect() {
    window.open(redirectUrl, "_self");
  }
</script>

<button
  in:fly={{ y: 200, duration: 2000 }}
  class="magical-button"
  on:click={() => {
    console.log(redirectUrl);
    performRedirect();
  }}
>
  ✨ Take me there! 🦄
</button>

<style lang="scss">
  .magical-button {
    @include make-magical();
  }
</style>
