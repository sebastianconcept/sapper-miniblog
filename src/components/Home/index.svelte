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
  <BlogBrand />
  <ArticleList {showPublishingState} {selection} />
  <SidebarMenu />
</div>
