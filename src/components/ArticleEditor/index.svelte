<script context="module">
  import * as api from "../../api.js";
</script>

<script>
  import { onMount } from "svelte";
  import { goto, stores } from "@sapper/app";

  export let article;
  export let slug;

  const autosaveDuration = 10000; // 10 sec

  const { session } = stores();
  let contentEditor;
  let excerptEditor;
  let title = article.title || "";
  let subtitle = article.subtitle || "";
  let body = article.body || "";
  let excerpt = article.excerpt || "";

  onMount(() => {
    import("easymde").then(module => {
      const EasyMDE = module.default;
      contentEditor = new EasyMDE({
        element: document.getElementById("content")
      });
      excerptEditor = new EasyMDE({
        element: document.getElementById("excerpt")
      });
      contentEditor.value(body);
      excerptEditor.value(excerpt);
      setInterval(() => {
        save();
      }, autosaveDuration);
    });
  });

  async function save() {
    article.title = title;
    article.subtitle = subtitle;
    article.body = contentEditor.value();
    article.excerpt = excerptEditor.value();
    const id = await api.post("articles", article);
    if (!article._id) {
      article._id = id;
    }
  }

  function onClose() {
    save();
    goto("/publisher");
  }

  function onPreview() {
    save();
    goto(`/publisher/preview/${article.slug}`);
  }

  function onUnpublish() {
    delete article.publishedAt;
    save();
    goto(`/publisher`);
  }
</script>

<svelte:head>
  <title>{title || 'New Article'}</title>
  <link
    rel="stylesheet"
    href="https://unpkg.com/easymde/dist/easymde.min.css" />
</svelte:head>

<div class="article-editor">
  <div class="btn-group">
    <button class="btn" on:click={onClose}>Close</button>
    <button class="btn btn-primary" on:click={onPreview}>Preview</button>
    {#if article.publishedAt}
      <button on:click={onUnpublish}>Unpublish</button>
    {/if}
  </div>
  <div id="editor-container">
    <input bind:value={title} placeholder="Title" />
    <input bind:value={subtitle} placeholder="Subtitle" />
    <textarea id="content" style="display:none;" />
    <textarea id="excerpt" style="display:none;" />
  </div>
</div>
