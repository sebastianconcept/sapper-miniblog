<script>
  import { onMount } from "svelte";
  import { stores } from "@sapper/app";
  const { session, page } = stores();

  import BlogBrand from "./BlogBrand";
  import ArticleList from "../ArticleList";
  import SidebarMenu from "../SidebarMenu";

  let queryParams = {};
  const showPublishingState = false;
  const selection = "published";
</script>

<style>

</style>

<div class="home-page">
  <div class="container">
    <div class="columns">
      <div class="col-8 col-sm-12 float-right ">
        <BlogBrand />
        <ArticleList {showPublishingState} {selection} />
      </div>
      <div class="col-4 col-sm-12 float-left sidebar-container">
        <SidebarMenu />
      </div>
    </div>
  </div>
</div>
