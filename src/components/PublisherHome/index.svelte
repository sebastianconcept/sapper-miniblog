<script>
  import ArticleList from "../Publisher/ArticleList";
  import Search from "./Search";
  import ArticleFilter from "../ArticleFilter";
  import * as api from "../../api.js";
  import { goto } from "@sapper/app";

  let selection = "drafts";
  let filter = "";
  let articleList;

  function onSearch(event) {
    filter = event.detail || "";
    console.log("onSearch", filter);
    // console.log("filter", articleList);
  }
</script>

<style>

</style>

<div class="home-page">
  <ArticleFilter
    {selection}
    on:drafts={() => (selection = 'drafts')}
    on:published={() => (selection = 'published')}
    on:all={() => (selection = 'all')} />
  <button class="button" on:click={() => goto('/publisher/editor/new')}>
    New Article
  </button>
  <Search on:search={onSearch} />
  <ArticleList {selection} {filter} />
  <!-- <ArticleList {selection} bind:this={articleList} /> -->
</div>
