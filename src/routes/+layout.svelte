<script>
  import "../app.scss";
  import Github from "svelte-material-icons/Github.svelte";
  import TelevisionClassic from "svelte-material-icons/TelevisionClassic.svelte";

  const version = "1.1.0";
</script>

<nav>
  <div>
    <!-- <a href="">View source code</a> -->
    <a href="/"> Home</a>
    <span>|</span>
    <a href="/ask">Ask Lee</a>
  </div>

  <div>
    <span class="github-nav-icon">
      <a target="_blank" href="https://github.com/bananabrann/tv.brannan.cloud">
        <Github size="1.75rem" />
      </a>
    </span>
    <span>{version}</span>
  </div>
  <!-- <a href={`https://github.com/bananabrann/tv.brannan.cloud/releases/tag/v&#x24;{version}`}>{version}</a -->
</nav>

<slot />

<style lang="scss">
  nav {
    display: flex;
    justify-content: space-between;

    > div {
      display: flex;
      align-items: center;
      gap: 1vw;
    }
  }

  .github-nav-icon {
    a {
      color: inherit;
    }
  }
</style>
