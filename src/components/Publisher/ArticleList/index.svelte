<script context="module">
  export let articles;

  export function preload({ params }) {
    // fetch articles
    // this.fetch...
  }
</script>

<script>
  import ArticlePreview from "./ArticlePreview";
</script>

<div class="container">
  <ul class="">
    {#each articles as article}
      <li class="article-preview">
        <ArticlePreview />
      </li>
    {/each}
  </ul>
</div>
