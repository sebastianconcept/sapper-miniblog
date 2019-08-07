<script>
  import { stores } from "@sapper/app";
  import ArticleList from "../ArticleList/index.svelte";

  export let tab = "all";
  export let tag = null;
  export let p;

  const { session } = stores();
</script>

<div class="col-md-9">
  <ArticleList {p} {tab} {tag} />
</div>
