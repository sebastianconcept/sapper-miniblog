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

</style>

<div class="article-preview">
  <div class="article-meta">
    <a href="/blog/${article.slug}">
      <img src={article.image} alt={article.imageDescription} />
    </a>

    <div class="info">
      <span class="date">{new Date(article.createdAt).toDateString()}</span>
    </div>
  </div>

  <a href="/article/{article.slug}" rel="prefetch" class="preview-link">
    <h2>{article.title}</h2>
  </a>
  <h3>{article.subtitle}</h3>
  <div class="text excerpt-text">
    {@html markup}
  </div>
</div>
