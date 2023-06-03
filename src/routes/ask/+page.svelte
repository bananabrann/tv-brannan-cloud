<script>
  let text = "";

  // async function sendChatMessage() {
  //   const response = await fetch("/ask");
  //   text = await response.json();
  //   console.log(response);
  // }
</script>

<h2>Ask a question</h2>

{#if text !== undefined}
  <p>{text}</p>
{/if}
