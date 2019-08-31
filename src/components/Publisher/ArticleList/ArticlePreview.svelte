<script>
  import marked from "marked";
  export let article;
  let markup;

  $: if (article) {
    if (article.excerpt) {
      markup = marked(article.excerpt);
    }
  }
</script>

<style>
  .excerpt-text {
    margin: 1em 0;
  }
</style>

<div class="article-preview">
  <div class="info">
    <span class="date">{new Date(article.createdAt).toDateString()}</span>
  </div>
  <a href="/publisher/editor/{article.slug}" class="article-title-link">
    <h2>{article.title}</h2>
  </a>
  <h3>{article.subtitle}</h3>
  <div class="text excerpt-text">
    {@html markup}
  </div>
  <!-- <Claps quantity={article.claps} /> -->
</div>
