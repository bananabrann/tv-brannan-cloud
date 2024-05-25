<script>
  import { page } from "$app/stores";
  let message = $page.url.searchParams.get("message");
</script>

<div id="message-container">
  <code>{message}</code>
</div>

<style lang="scss">
  #message-container {
    display: flex;
    width: 90vw;
    justify-content: center;
    word-wrap: wrap;
    font-size: 3rem;
    margin: 4rem auto 0 auto;

    code {
      display: flex;
      justify-content: center;
      padding: 3rem;
      width: 100%;
      flex-wrap: wrap;
      word-wrap: wrap;
      word-break: break-all;
    }
  }
</style>
