<script>
  import "../app.scss";
  import Github from "svelte-material-icons/Github.svelte";
  import Fullscreen from "svelte-material-icons/Fullscreen.svelte";
  import { version } from "$app/environment";

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }
</script>

<div class="line" />

<main>
  <nav>
    <div>
      <a href="/"> Home</a>
      <span>|</span>
      <a href="/whats-new">What's New</a>
      <span>|</span>
      <a href="/ask">Find A Show</a>
    </div>

    <div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <span class="fullscreen-nav-icon" on:click={toggleFullscreen}>
        <Fullscreen size="1.25rem" />
      </span>

      <span class="github-nav-icon">
        <a target="_blank" href="https://github.com/bananabrann/tv.brannan.cloud">
          <Github size="1.25rem" />
        </a>
      </span>

      <span>{version}</span>
    </div>
    <!-- <a href={`https://github.com/bananabrann/tv.brannan.cloud/releases/tag/v&#x24;{version}`}>{version}</a -->
  </nav>

  <slot />
</main>

<style lang="scss">
  main {
    margin: 0.25rem 1rem;
  }
  nav {
    display: flex;
    justify-content: space-between;

    > div {
      display: flex;
      align-items: center;
      gap: 1vw;
      a {
        font-size: 1.15em;
      }
    }
  }

  .github-nav-icon {
    a {
      color: inherit;
    }
  }

  .fullscreen-nav-icon {
    cursor: pointer;
  }

  .line {
    margin: 0;
    padding: 0;
    height: 0.25rem;
    background-color: $brand-primary-color;
  }
</style>
