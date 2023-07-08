<script>
  export let name = "";
  export let linkUrl = "/404";
  export let imageUrl = "";
</script>

<a href={linkUrl} class="provider">
  <img src={imageUrl} alt={name} />
  <div class="provider-name">{name}</div>
</a>

<style lang="scss">
  .provider {
    position: relative;
    cursor: pointer;
    text-align: center;
    transition: all 0.3s ease;
    overflow: hidden;
    display: block;
    border-radius: 1.5rem;
    img {
      @include gentle-transition();
      width: 100%;
    }

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 0 5rem rgba(255, 255, 255, 0.3);

      img {
        filter: brightness(1.4);
      }
    }
  }

  .provider-name {
    @include gentle-transition();
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.6);
    color: $light-color;
    text-transform: uppercase;
    font-weight: bold;
  }
</style>
