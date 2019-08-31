<script>
  import { onMount } from "svelte";
  import { stores } from "@sapper/app";
  import marked from "marked";

  import ArticleMeta from "./ArticleMeta.svelte";

  export let article;
  let markup;

  const { session } = stores();

  $: if (article) {
    markup = marked(article.body);
  }

  // onMount(() => {
  //   api.get(`articles/${slug}/comments`).then(res => {
  //     comments = res.comments;
  //   });
  // });
</script>

<svelte:head>
  <title>{article.title}</title>
</svelte:head>

<div class="article-page">
  {#if article}
    <div class="banner">
      <div class="container">
        <ArticleMeta {article} user={$session.user} />
        <h2>{article.title}</h2>
        <h3>{article.subtitle}</h3>
      </div>
    </div>

    <div class="container page">
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

      <div class="article-actions" />
    </div>
  {/if}
</div>
