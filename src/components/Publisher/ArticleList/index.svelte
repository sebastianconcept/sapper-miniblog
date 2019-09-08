<script context="module">
  export function preload({ params }) {
    // fetch articles
    // this.fetch...
  }
</script>

<script>
  import { onMount } from "svelte";
  import InfinitePaginator from "../../InfinitePaginator";
  import ArticlePreview from "./ArticlePreview";

  import { stores } from "@sapper/app";
  import * as api from "../../../api.js";

  import hljs from "highlight.js/lib/highlight";
  import javascript from "highlight.js/lib/languages/javascript";

  hljs.registerLanguage("javascript", javascript);
  onMount(() => hljs.initHighlightingOnLoad());

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
    $session.search;
    reset();
  }

  $: {
    const endpoint = "articles";
    let params = "";
    if ($session.search) {
      params = `selection=${selection}&filter=${
        $session.search
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

<style>

</style>

<div class="container">
  {#if articles}
    {#if articles.length === 0}
      <div class="empty">
        <div class="empty-icon">
          <i class="icon icon-3x icon-more-horiz" />
        </div>
        <p class="empty-title h5">No articles to display</p>
      </div>
    {:else}
      <div class="">
        {#if articles.length}
          {#each articles as article}
            <ArticlePreview {article} />
          {/each}
          <InfinitePaginator on:paginate={onPaginate} />
        {/if}
      </div>
    {/if}
  {:else}
    <div class="loading loading-lg" />
  {/if}
</div>
