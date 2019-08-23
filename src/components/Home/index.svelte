<script>
  import BlogBrand from "./BlogBrand";
  import ArticleList from "../ArticleList";
  import SidebarMenu from "../SidebarMenu";
  import * as api from "../../api.js";

  export let filterTarget;

  const showPublishingState = false;
  const selection = "published";

  function onSearch(event) {
    filterTarget = event.detail;
  }
</script>

<style>

</style>

<div class="home-page">
  <BlogBrand />
  <ArticleList {showPublishingState} {selection} {filterTarget} />
  <SidebarMenu on:search={onSearch} />
</div>
