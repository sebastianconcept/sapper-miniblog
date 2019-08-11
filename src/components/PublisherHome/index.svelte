<script>
  import ArticleList from "../Publisher/ArticleList";
  import Search from "./Search";
  import ArticleFilter from "../ArticleFilter";
  import * as api from "../../api.js";

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
  <Search />
  <ArticleList {selection} />
</div>
