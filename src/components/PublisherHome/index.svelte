<script>
  import ArticleList from "../Publisher/ArticleList";
  import Search from "./Search";
  import ArticleFilter from "../ArticleFilter";
  import * as api from "../../api.js";
  import { goto } from "@sapper/app";

  let selection = "drafts";
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
  <Search />
  <ArticleList {selection} />
</div>
