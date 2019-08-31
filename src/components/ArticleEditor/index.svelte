<script context="module">
  import * as api from "../../api.js";
</script>

<script>
  import { onMount, onDestroy } from "svelte";
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
  let autosave;

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
      autosave = setInterval(() => {
        save();
      }, autosaveDuration);
    });
  });

  onDestroy(() => clearInterval(autosave));

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

<style>
  .article-editor {
    margin-top: 2em;
  }

  .form-group {
    margin-bottom: 1.4rem;
  }
</style>

<svelte:head>
  <title>{title || 'New Article'}</title>
  <link
    rel="stylesheet"
    href="https://unpkg.com/easymde/dist/easymde.min.css" />
</svelte:head>

<div class="article-editor">
  <div class="header-bar">
    <button class="btn float-left" on:click={onClose}>Close</button>
    <div class="btn-group float-right">
      <button class="btn btn-primary" on:click={onPreview}>Preview</button>
      {#if article.publishedAt}
        <button class="btn" on:click={onUnpublish}>Unpublish</button>
      {/if}
    </div>
  </div>
  <div id="editor-container">
    <form>
      <div class="form-group">
        <h3>Title</h3>
        <input
          class="form-input input-lg"
          bind:value={title}
          placeholder="Title" />
      </div>
      <div class="form-group">
        <h3>Subtitle</h3>
        <input
          class="form-input"
          bind:value={subtitle}
          placeholder="Subtitle" />
      </div>
      <div class="form-group">
        <h3>Body</h3>
        <textarea id="content" style="display:none;" />
      </div>
      <div class="form-group">
        <h3>Excerpt</h3>
        <textarea id="excerpt" style="display:none;" />
      </div>
    </form>
  </div>
</div>
