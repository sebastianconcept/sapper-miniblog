<script>
  import ArticleList from "../Publisher/ArticleList";
  import Search from "./Search";
  import ArticleFilter from "../ArticleFilter";
  import * as api from "../../api.js";
  import { goto } from "@sapper/app";

  let selection = "drafts";
  let articleList;
</script>

<style>

</style>

<div class="home-page">
  <div class="container">
    <ArticleFilter
      {selection}
      on:drafts={() => (selection = 'drafts')}
      on:published={() => (selection = 'published')}
      on:all={() => (selection = 'all')} />
    <button
      class="btn btn-primary float-right"
      on:click={() => goto('/publisher/editor/new')}>
      New Article
    </button>
    <Search />
  </div>
  <ArticleList {selection} />
  <!-- <ArticleList {selection} bind:this={articleList} /> -->
</div>
