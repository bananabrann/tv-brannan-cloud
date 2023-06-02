<script>
  import "../app.scss";
  const version = "1.1.0";
</script>

<nav>
  <a href="">View source code</a>
  <a href="">Report an issue</a>
  <a href={`https://github.com/bananabrann/tv.brannan.cloud/releases/tag/v&#x24;{version}`}>{version}</a
  >
</nav>
<slot />
