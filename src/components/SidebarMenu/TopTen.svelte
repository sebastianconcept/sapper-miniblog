<script>
  export let topTenArticles;
</script>

<style>

</style>

{#if topTenArticles}
  <div className="tag-list">
    {#each topTenArticles as article}
      <a href="/articles/{article.slug}" class="tag-default tag-pill">
        {article.title}
      </a>
    {/each}
  </div>
{:else}
  <div>Loading Top Ten Articles...</div>
{/if}
