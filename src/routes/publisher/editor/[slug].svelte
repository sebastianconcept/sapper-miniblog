<script context="module">
  import * as api from "../../../api.js";

  export async function preload({ params }) {
    const { slug } = params;
    const { article } = await api.get(`articles/${params.slug}`, null);

    return { article, slug };
  }
</script>

<script>
  import { onMount } from "svelte";
  import { stores } from "@sapper/app";

  // import ArticleMeta from "./ArticleMeta.svelte";

  export let article;
  export let slug;

  const { session } = stores();
  let editor;
  let title = article.title || "";
  let subtitle = article.subtitle || "";
  let body = article.body || "";

  // $: markup = marked(article.body);

  onMount(() => {
    import("easymde").then(module => {
      const EasyMDE = module.default;
      editor = new EasyMDE({
        element: document.getElementById("editor")
      });
      editor.value(body);
    });
    // const easyMDE = new EasyMDE();
    // api.get(`articles/${slug}/comments`).then(res => {
    //   comments = res.comments;
    // });
  });

  // onDestroy(() => {});
</script>

<svelte:head>
  <title>{title || 'New Article'}</title>
  <link
    rel="stylesheet"
    href="https://unpkg.com/easymde/dist/easymde.min.css" />
</svelte:head>

<div class="article-editor">
  <div id="editor-container">
    <input bind:value={title} placeholder="Title" />
    <input bind:value={subtitle} placeholder="Subtitle" />
    <textarea id="editor" style="display:none;" />
  </div>

  <ul class="tag-list">
    {#each article.tagList as tag}
      <li class="tag-default tag-pill tag-outline">{tag}</li>
    {/each}
  </ul>
</div>
