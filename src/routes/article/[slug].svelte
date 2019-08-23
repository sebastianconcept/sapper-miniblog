<script context="module">
  import * as api from "../../api.js";

  export async function preload({ params }) {
    const { slug } = params;

    const article = await api.get(`articles/${slug}`, null);
    return { article, slug };
  }
</script>

<script>
  import { stores } from "@sapper/app";

  import Article from "../../components/Article";

  export let article;
  export let slug;
</script>

<svelte:head>
  <title>{article.title}</title>
</svelte:head>

<div class="article-page">
  <Article {article} />
</div>
