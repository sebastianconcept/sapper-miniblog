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

{#if articles}
  {#if articles.length === 0}
    <div class="article-preview">No articles are here...</div>
  {:else}
    <ul class="">
      {#each articles as article (article.slug)}
        <li class="article-editor-preview">
          <ArticlePreview {article} />
        </li>
      {/each}
      <InfinitePaginator on:paginate={onPaginate} />
    </ul>
  {/if}
{:else}
  <div class="article-preview">Loading...</div>
{/if}
