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

  <div class="banner">
    <div class="container">
      <h1>{article.title}</h1>
      <ArticleMeta {article} user={$session.user} />
    </div>
  </div>

  <div class="container page">
    <div class="row article-content">
      <div class="col-xs-12">
        <div>
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
</div>
