<script context="module">
  import * as api from "../../../api.js";
  import Article from "../../../components/Article";

  let article;

  export async function preload({ params }) {
    const { slug } = params;
    article = await api.get(`articles/${params.slug}`, null);
    return { article, slug };
  }
</script>

<script>
  import { goto } from "@sapper/app";

  export let article;
  export let slug;

  function onEdit() {
    goto(`/publisher/editor/${article.slug}`);
  }

  function onPublish() {
    const confirmed = confirm("Publish?");
    if (confirmed) {
      console.log("publishing");
      publish();
    }
  }

  function publish() {
    article.publishedAt = new Date();
    api.post("articles", article);
  }
</script>

<div class="article-preview">
  <div class="header-bar">
    <div class="btn-group ">
      <button class="btn" on:click={onEdit}>Edit</button>
    </div>
    {#if !article.publishedAt}
      <button class="btn btn-primary float-right" on:click={onPublish}>
        Publish
      </button>
    {/if}
  </div>
  <Article {article} />
</div>
