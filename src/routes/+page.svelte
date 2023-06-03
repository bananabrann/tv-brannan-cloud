<script>
  import StreamingService from "../StreamingService.svelte";
</script>

<br />
<br />

<section id="streaming-providers-container">
  <StreamingService
    name="Paramount"
    linkUrl="https://www.paramountplus.com/"
    imageUrl="https://files.brannan.cloud/tv/paramount-450x174.jpg"
  />

  <StreamingService
    name="Netflix"
    linkUrl="https://www.netflix.com/"
    imageUrl="https://files.brannan.cloud/tv/netflix-450x174.jpg"
  />

  <StreamingService
    name="Hulu"
    linkUrl="https://www.hulu.com/"
    imageUrl="https://files.brannan.cloud/tv/hulu-450x174.jpg"
  />

  <StreamingService
    name="YouTube"
    linkUrl="https://tv.youtube.com/welcome/"
    imageUrl="https://files.brannan.cloud/tv/youtube-450x174.jpg"
  />
</section>

<section />

<!-- <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> -->

<style>
  #streaming-providers-container {
    /* max-width: 80%; */
    margin: 0 auto;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    flex-basis: 300px;
    gap: 4vw;

    @media (max-width: 800px) {
      gap: 1rem;
    }
  }
</style>
