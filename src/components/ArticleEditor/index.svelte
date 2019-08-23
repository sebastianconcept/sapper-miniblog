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
  let editor;
  let title = article.title || "";
  let subtitle = article.subtitle || "";
  let body = article.body || "";

  onMount(() => {
    import("easymde").then(module => {
      const EasyMDE = module.default;
      editor = new EasyMDE({
        element: document.getElementById("editor")
      });
      editor.value(body);
      setInterval(() => {
        save();
      }, autosaveDuration);
    });
  });

  async function save() {
    article.title = title;
    article.subtitle = subtitle;
    article.body = editor.value();
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

  // onDestroy(() => {});
</script>

<svelte:head>
  <title>{title || 'New Article'}</title>
  <link
    rel="stylesheet"
    href="https://unpkg.com/easymde/dist/easymde.min.css" />
</svelte:head>

<div class="article-editor">
  <button on:click={onClose}>Close</button>
  <button on:click={onPreview}>Preview</button>
  <div id="editor-container">
    <input bind:value={title} placeholder="Title" />
    <input bind:value={subtitle} placeholder="Subtitle" />
    <textarea id="editor" style="display:none;" />
  </div>
</div>
