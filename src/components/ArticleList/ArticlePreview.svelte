<script>
  export let article;
</script>

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
    <h1>{article.title}</h1>
    <p>{article.description}</p>
    <span>Read more...</span>
    <ul class="tag-list">
      {#each article.tagList as tag}
        <li class="tag-default tag-pill tag-outline">{tag}</li>
      {/each}
    </ul>
  </a>
</div>
