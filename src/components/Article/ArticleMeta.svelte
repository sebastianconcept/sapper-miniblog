<script>
  import { goto } from "@sapper/app";
  import * as api from "../../api.js";

  export let article;
  export let user;
</script>

<div class="article-meta">
  <div class="info">
    <span class="date">{new Date(article.createdAt).toDateString()}</span>
  </div>
</div>
