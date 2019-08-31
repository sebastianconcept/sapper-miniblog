<script>
  export let topTenArticles;
</script>

<style>
  h4 {
    color: #fff;
  }
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
