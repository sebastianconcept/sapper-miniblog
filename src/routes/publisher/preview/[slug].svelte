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

<div class="article-editor">
  <button on:click={onEdit}>Edit</button>
  <button on:click={onPublish}>Publish</button>
  <Article {article} />
</div>
