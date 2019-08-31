<script>
  import marked from "marked";
  import ArticleMeta from "../../Article/ArticleMeta";

  export let article;
  let markup = "";

  $: if (article) {
    markup = marked(getExcerpt(article));
  }

  export function getExcerpt(article) {
    if (article.excerpt) {
      return article.excerpt;
    } else {
      return article.body.split("\n")[0];
    }
  }
</script>

<style>
  .excerpt-text {
    margin: 1em 0;
  }
</style>

<div class="article-preview">
  <ArticleMeta {article} />
  <a href="/publisher/editor/{article.slug}" class="article-title-link">
    <h2>{article.title}</h2>
  </a>
  <h3>{article.subtitle}</h3>
  <div class="text excerpt-text">
    {@html markup}
  </div>
  <!-- <Claps quantity={article.claps} /> -->
</div>
