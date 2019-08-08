<script>
  import Claps from "../../../Claps.svelte";
  export let article;
</script>

<div class="article-preview">
  <a href="/articles/{article.slug}" class="article-title-link">
    <h3>{article.title}</h3>
  </a>
  {#if article.subtitle}
    <h4>{article.subtitle}</h4>
  {/if}
  <div>{article.exerpt}</div>
  <div class="article-preview-tags">{article.tags}</div>
  <Claps quantity={article.claps} />
  <div class="article-preview-date">{article.publishedAt.toString()}</div>
</div>
