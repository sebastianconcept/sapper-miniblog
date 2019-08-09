<script>
  import ArticleList from "../ArticleList";
  import Search from "./Search";
  import ArticleFilter from "../ArticleFilter";
  import * as api from "../../api.js";

  const showPublishingState = true;
  let selection = "published";
</script>

<style>

</style>

<div class="home-page">
  <ArticleFilter />
  <Search />
  <ArticleList {showPublishingState} {selection} />
</div>
