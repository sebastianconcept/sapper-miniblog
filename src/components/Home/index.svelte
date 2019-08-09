<script>
  import BlogBrand from "./BlogBrand";
  import ArticleList from "../ArticleList";
  import SidebarMenu from "../SidebarMenu";
  import * as api from "../../api.js";

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
