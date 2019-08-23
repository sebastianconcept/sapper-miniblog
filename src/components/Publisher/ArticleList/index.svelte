<script context="module">
  export function preload({ params }) {
    // fetch articles
    // this.fetch...
  }
</script>

<script>
  import InfinitePaginator from "../../InfinitePaginator";
  import ArticlePreview from "./ArticlePreview";

  import { stores } from "@sapper/app";
  import * as api from "../../../api.js";

  export let selection = "published";
  export let filter = "";
  export let currentPage = 1;
  let isLastPage = false;
  export let filterTarget = "";

  const { session, page } = stores();
  let articles = [];
  let query;
  let articlesCount;
  const pageSize = 10;

  $: {
    selection;
    filterTarget;
    reset();
  }

  $: {
    const endpoint = "articles";
    let params = "";
    if (filterTarget) {
      params = `selection=${selection}&filter=${
        filterTarget.target
      }&limit=${pageSize}&offset=${(currentPage - 1) * pageSize}`;
    } else {
      params = `selection=${selection}&limit=${pageSize}&offset=${(currentPage -
        1) *
        pageSize}`;
    }
    query = `${endpoint}?${params}`;
  }

  $: query && getData();
  async function getData() {
    // TODO do we need some error handling here?
    const answer = await api.get(query, $session.user && $session.user.token);
    articles = articles.concat(...answer.articles);
    articlesCount = answer.articlesCount;
  }

  function reset() {
    articles = [];
    currentPage = 1;
    articlesCount = null;
    isLastPage = false;
  }

  function onPaginate(event) {
    if (articlesCount < pageSize) {
      isLastPage = true;
    }

    if (!isLastPage) {
      currentPage = currentPage + 1;
    }
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
        <InfinitePaginator on:paginate={onPaginate} />
      </ul>
    {/if}
  {:else}
    <p>Loading articles...</p>
  {/if}
</div>
