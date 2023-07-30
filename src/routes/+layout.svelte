<script>
  import "../app.scss";
  import Github from "svelte-material-icons/Github.svelte";
  import { version } from "$app/environment";
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
    }
  }

  .github-nav-icon {
    a {
      color: inherit;
    }
  }

  .line {
    margin: 0;
    padding: 0;
    height: 0.25rem;
    background-color: $brand-primary-color;
  }
</style>
