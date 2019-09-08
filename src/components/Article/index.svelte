<script>
  import { onMount } from "svelte";
  import { stores } from "@sapper/app";
  import marked from "marked";

  import ArticleMeta from "./ArticleMeta.svelte";
  import Ad from "./Ad.svelte";

  import hljs from "highlight.js/lib/highlight";
  import javascript from "highlight.js/lib/languages/javascript";
  import smalltalk from "highlight.js/lib/languages/smalltalk";

  hljs.registerLanguage("javascript", javascript);
  hljs.registerLanguage("smalltalk", smalltalk);
  hljs.initHighlightingOnLoad();

  export let article;
  let markup;

  const { session } = stores();

  $: if (article) {
    markup = marked(article.body);
  }
</script>

<style>
  .container {
    padding-right: 1.4rem;
  }
</style>

<svelte:head>
  <title>{article.title}</title>
</svelte:head>
<div class="article-container">
  <Ad />
  {#if article}
    <div class="banner">
      <div class="container">
        <ArticleMeta {article} user={$session.user} />
        <h2>{article.title}</h2>
        <h3>{article.subtitle}</h3>
      </div>
    </div>

    <div class="container">
      <div class="row article-content">
        <div class="col-xs-12">
          <div class="text">
            {@html markup}
          </div>

          <!-- <ul class="tag-list">
          {#each article.tags as tag}
            <li class="tag-default tag-pill tag-outline">{tag}</li>
          {/each}
        </ul> -->
        </div>
      </div>

      <hr />

      <div class="empty">
        <div class="empty-icon">
          <i class="icon icon-3x icon-more-horiz" />
        </div>
      </div>
    </div>
  {/if}
</div>
