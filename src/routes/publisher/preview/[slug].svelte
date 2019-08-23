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
  export let article;
  export let slug;

  function onPublish() {
    console.log("onPublish");
  }
</script>

<div class="article-editor">
  <button on:click={onPublish}>Publish</button>
  <Article {article} />
</div>
