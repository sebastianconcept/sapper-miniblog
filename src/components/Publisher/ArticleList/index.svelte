<script context="module">
  export function preload({ params }) {
    // fetch articles
    // this.fetch...
  }
</script>

<script>
  import ArticlePreview from "./ArticlePreview";

  import { stores } from "@sapper/app";
  import * as api from "../../../api.js";

  export let selection = "published";
  export let filter = "";
  export let currentPage = 1;
  export let filterTarget = "";

  const { session, page } = stores();
  let articles = [];
  let query;
  let articlesCount;

  $: {
    const endpoint = "articles";
    const page_size = 10;
    let params = "";
    if (filterTarget) {
      params = `selection=${selection}&filter=${
        filterTarget.target
      }&limit=${page_size}&offset=${(currentPage - 1) * page_size}`;
    } else {
      params = `selection=${selection}&limit=${page_size}&offset=${(currentPage -
        1) *
        page_size}`;
    }
    query = `${endpoint}?${params}`;
  }

  $: query && getData();
  async function getData() {
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
      <div class="article-preview">No articles are here...</div>
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
