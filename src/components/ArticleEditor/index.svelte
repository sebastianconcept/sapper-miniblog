<script context="module">
  import * as api from "../../api.js";
</script>

<script>
  import { onMount, onDestroy } from "svelte";
  import { goto, stores } from "@sapper/app";
  import { updateSlug } from "../../routes/api/articles";

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
  let publishedAt = article.publishedAt || "";

  let autosave;
  let canSaveNow = canSave();

  $: {
    title;
    canSaveNow = canSave();
  }

  function canSave() {
    return !!title;
  }

  onMount(() => {
    import("easymde").then(module => {
      const EasyMDE = module.default;
      contentEditor = new EasyMDE({
        showIcons: ["code"],
        element: document.getElementById("content")
      });
      excerptEditor = new EasyMDE({
        showIcons: ["code"],
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
    updateSlug(article);
    article.subtitle = subtitle;
    article.body = contentEditor.value();
    article.excerpt = excerptEditor.value();

    if (publishedAt) {
      article.publishedAt = publishedAt;
    }

    if (canSaveNow) {
      const id = await api.post("articles", article);
      if (!article._id) {
        article._id = id;
      }
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

  async function onDelete() {
    const confirmed = confirm("Delete this article? (no undo)");
    if (confirmed) {
      api.del(`articles?id=${article._id}`);
      goto(`/publisher`);
    }
  }

  function onUnpublish() {
    publishedAt = undefined;
    delete article.publishedAt;
    save();
    goto(`/publisher`);
  }
</script>

<style>
  .article-editor {
    margin-top: 2em;
    margin-bottom: 4em;
  }

  .form-group {
    margin-bottom: 1.4rem;
  }
</style>

<svelte:head>
  <title>{title || 'New Article'}</title>
  <link rel="stylesheet" href="easymde.min.css" />
</svelte:head>

<div class="article-editor">
  <div class="header-bar">
    <button class="btn float-left" on:click|preventDefault={onClose}>
      Close
    </button>
    <div class="btn-group float-right">
      <button
        class="btn btn-primary"
        on:click|preventDefault={onPreview}
        disabled={!canSaveNow}>
        Preview
      </button>
      {#if article.publishedAt}
        <button
          class="btn"
          on:click|preventDefault={onUnpublish}
          disabled={!canSaveNow}>
          Unpublish
        </button>
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
      <div class="form-group">
        <h3>Publication date</h3>
        <input
          class="form-input"
          type="date"
          bind:value={publishedAt}
          value={publishedAt}
          placeholder="Publication date" />
      </div>
      <br />
      <br />
      <br />
      <br />
      <button
        class="btn btn-primary col-12 warning"
        on:click|preventDefault={onDelete}>
        Delete
      </button>
    </form>
  </div>
</div>
