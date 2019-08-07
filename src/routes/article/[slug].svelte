<script context="module">
  import * as api from "../../api.js";

  export async function preload({ params }) {
    const { slug } = params;
    const { article } = await api.get(`articles/${params.slug}`, null);

    return { article, slug };
  }
</script>

<script>
  import { onMount } from "svelte";
  import { stores } from "@sapper/app";
  import marked from "marked";

  import ArticleMeta from "./ArticleMeta.svelte";

  export let article;
  export let slug;

  const { session } = stores();

  let commentErrors,
    comments = []; // we'll lazy-load these in onMount
  $: markup = marked(article.body);

  onMount(() => {
    api.get(`articles/${slug}/comments`).then(res => {
      comments = res.comments;
    });
  });
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

        <ul class="tag-list">
          {#each article.tagList as tag}
            <li class="tag-default tag-pill tag-outline">{tag}</li>
          {/each}
        </ul>
      </div>
    </div>

    <hr />

    <div class="article-actions" />
  </div>
</div>
