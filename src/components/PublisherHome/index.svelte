<script>
  import ArticleList from "../Publisher/ArticleList";
  import Search from "./Search";
  import ArticleFilter from "../ArticleFilter";
  import * as api from "../../api.js";

  let selection = "published";
</script>

<style>

</style>

<div class="home-page">
  <ArticleFilter />
  <Search />
  <ArticleList {selection} />
</div>
