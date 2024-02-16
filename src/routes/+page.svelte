<script>
  import ShowOfTheWeek from "$lib/components/ShowOfTheWeek.svelte";
  import StreamingService from "$lib/components/StreamingService.svelte";
</script>

<!-- prettier-ignore -->
<ShowOfTheWeek
  providerName="Netflix"
  showName="Knock at the Cabin"
  recommendedBy="Alex"
/>

<h1>Hello Sangeeta</h1>

<section id="streaming-providers-container">
  <StreamingService
    name="Paramount"
    linkUrl="https://www.paramountplus.com/"
    imageUrl="https://files.brannan.cloud/tv-files/paramount-450x174.jpg"
  />

  <StreamingService
    name="Netflix"
    linkUrl="https://www.netflix.com/"
    imageUrl="https://files.brannan.cloud/tv-files/netflix-450x174.jpg"
  />

  <StreamingService
    name="Hulu"
    linkUrl="https://www.hulu.com/"
    imageUrl="https://files.brannan.cloud/tv-files/hulu-450x174.jpg"
  />

  <StreamingService
    name="YouTube"
    linkUrl="https://youtube.com/"
    imageUrl="https://files.brannan.cloud/tv-files/youtube-450x174.jpg"
  />

  <StreamingService
    name="ESPN on Hulu"
    linkUrl="https://www.hulu.com/hub/sports"
    imageUrl="https://files.brannan.cloud/tv-files/espn-450x174.jpg"
  />

  <StreamingService
    name="ABC News Live on Hulu"
    linkUrl="https://www.hulu.com/hub/news-on-hulu"
    imageUrl="https://files.brannan.cloud/tv-files/abcnewslive-450x174jpg.jpg"
  />
</section>

<section />

<!-- <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> -->

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
