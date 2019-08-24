<script>
  import Claps from "../../Claps.svelte";
  export let article;
</script>

<div class="article-preview">
  <a href="/publisher/editor/{article.slug}" class="article-title-link">
    <h2>{article.title}</h2>
  </a>
  <h3>{article.subtitle}</h3>
  <!-- <div>{article.exerpt}</div> -->
  <Claps quantity={article.claps} />
  <div class="article-preview-date">{article.createdAt.toString()}</div>
</div>
