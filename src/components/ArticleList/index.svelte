<script>
  import { stores } from "@sapper/app";
  import ArticlePreview from "./ArticlePreview.svelte";
  import InfinitePaginator from "../InfinitePaginator";
  import * as api from "../../api.js";

  export let currentPage = 1;
  let isLastPage = false;

  const { session, page } = stores();

  let query;
  let articles = [];
  let articlesCount;
  const pageSize = 10;

  $: {
    $session.search;
    reset();
  }

  $: {
    const endpoint = "articles";
    let params = "";
    if ($session.search) {
      params = `filter=${
        $session.search
      }&limit=${pageSize}&offset=${(currentPage - 1) * pageSize}`;
    } else {
      params = `limit=${pageSize}&offset=${(currentPage - 1) * pageSize}`;
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
  .container {
    padding-right: 1.4rem;
  }
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
      <div class="articles">
        {#each articles as article (article.slug)}
          <ArticlePreview {article} />
        {/each}
        <InfinitePaginator on:paginate={onPaginate} />
      </div>
    {/if}
  {:else}
    <div class="loading loading-lg" />
  {/if}
</div>
