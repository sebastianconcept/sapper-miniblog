<script context="module">
  import * as api from "../../api.js";

  export async function preload({ params }) {
    const { slug } = params;

    const article = await api.get(`articles/${slug}`, null);
    return { article, slug };
  }
</script>

<script>
  import { goto, stores } from "@sapper/app";

  import Article from "../../components/Article";
  import SidebarMenu from "../../components/SidebarMenu";

  export let article;

  function onSearch(event) {
    goto(`/?search=${event.detail.target}`);
  }
</script>

<svelte:head>
  <title>{article.title}</title>
</svelte:head>

<div class="article-page">
  <Article {article} />
  <SidebarMenu on:search={onSearch} />

</div>
