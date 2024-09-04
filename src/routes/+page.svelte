<script>
  import StreamingService from "$lib/components/StreamingService.svelte";
</script>

<section id="streaming-providers-container">
  <StreamingService
    name=""
    linkUrl="https://www.netflix.com/"
    imageUrl="https://files.brannan.cloud/tv-files/netflix-450x174.jpg"
  />

  <StreamingService
    name=""
    linkUrl="https://www.amazon.com/Amazon-Video/b/?&node=2858778011&ref=dvm_MLP_ROWNA_US_1"
    imageUrl="https://brannancloudstorage.blob.core.windows.net/tv-files/prime-591x263.jpg"
  />

  <StreamingService
    name=""
    linkUrl="https://youtube.com/"
    imageUrl="https://files.brannan.cloud/tv-files/youtube-450x174.jpg"
  />

  <StreamingService
    name=""
    linkUrl="https://www.hulu.com/"
    imageUrl="https://files.brannan.cloud/tv-files/hulu-450x174.jpg"
  />

  <StreamingService
    name=""
    linkUrl="https://www.hulu.com/hub/sports"
    imageUrl="https://files.brannan.cloud/tv-files/espn-450x174.jpg"
  />

  <StreamingService
    name=""
    linkUrl="https://www.disneyplus.com/"
    imageUrl="https://files.brannan.cloud/tv-files/disney-450x174.png"
  />

  <StreamingService
    name=""
    linkUrl="https://www.kera.org/tv/live/"
    imageUrl="https://brannancloudstorage.blob.core.windows.net/tv-files/kera-450x174.png"
  />
</section>

<style>
  #streaming-providers-container {
    margin-top: 2em;
    margin-bottom: 75px;
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
