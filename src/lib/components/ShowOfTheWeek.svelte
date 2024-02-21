<script>
  export let showName;
  export let providerName;
  export let recommendedBy;
  import ShowOfTheWeekJpg from "$lib/assets/jpg/show-of-the-week.jpg";
</script>

<div class="show-of-the-week">
  <img src={ShowOfTheWeekJpg} alt="Cover art for the show of the week" />

  <div>
    <h2>What to Watch</h2>
    <h3>{showName}</h3>
    <p>
      Streaming on <b>{providerName}</b><br />
      Recommended by {recommendedBy}
    </p>
  </div>
</div>

<style lang="scss">
  .show-of-the-week {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0.75rem;
    margin: 1rem auto;
    padding: 0.85rem;
    border: 2px solid lighten($dark-color, 10%);
    border-radius: 0.5rem;

    img {
      height: 150px;
      max-width: 25%;
      object-fit: cover;
    }

    h2 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: normal;
    }

    h3 {
      margin: 0;
      font-size: 3rem;
      font-weight: bold;
    }

    p {
      margin: 0;
    }
  }
</style>
