<script context="module">
  export let selection = "published";
  export let currentPage = 1;

  export function preload({ params }) {
    // fetch articles
    // this.fetch...
  }
</script>

<script>
  import ArticlePreview from "./ArticlePreview";

  import { stores } from "@sapper/app";
  import * as api from "../../../api.js";

  const { session, page } = stores();
  let articles;
  let query;
  let articlesCount;
  let selection = "all";

  $: {
    const endpoint = "articles";
    const page_size = 10;
    let params = `selection=${selection}&limit=${page_size}&offset=${(currentPage -
      1) *
      page_size}`;
    query = `${endpoint}?${params}`;
  }

  $: query && getData();
  async function getData() {
    articles = null;
    // TODO do we need some error handling here?
    ({ articles, articlesCount } = await api.get(
      query,
      $session.user && $session.user.token
    ));
  }
</script>

<div class="container">
  {#if articles}
    {#if articles.length === 0}
      <div class="article-preview">No articles are here... yet.</div>
    {:else}
      <ul class="">
        {#each articles as article}
          <li class="article-editor-preview">
            <ArticlePreview {article} />
          </li>
        {/each}
      </ul>
    {/if}
  {:else}
    <p>Loading articles...</p>
  {/if}
</div>
