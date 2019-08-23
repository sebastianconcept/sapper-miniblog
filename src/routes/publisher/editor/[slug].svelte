<script context="module">
  import * as api from "../../../api.js";
  import ArticleEditor from "../../../components/ArticleEditor";

  let article;

  export async function preload({ params }) {
    const { slug } = params;
    if (slug === "new") {
      article = newArticle();
    } else {
      article = await api.get(`articles/${params.slug}`, null);
    }

    return { article, slug };
  }

  function newArticle() {
    return {
      title: undefined,
      subtitle: undefined,
      slug: undefined,
      body: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: undefined,
      tags: [],
      description: undefined,
      clapsCount: 0
    };
  }
</script>

<script>
  import { onMount } from "svelte";
  import { goto, stores } from "@sapper/app";

  export let article;
  export let slug;
</script>

<div class="article-editor">
  <ArticleEditor {article} />
</div>
