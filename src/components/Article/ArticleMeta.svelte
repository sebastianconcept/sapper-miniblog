<script>
  import { goto } from "@sapper/app";
  import * as api from "../../api.js";

  export let article;

  let date = article.publishedAt || article.createdAt;

  function words() {
    return article.body.split(" ").length;
  }
</script>

<style>
  .quantity-of-words {
    color: #ccc;
    font-size: 0.8em;
  }

  .article-meta {
    display: inline-block;
    width: 100%;
  }
</style>

<div class="article-meta">
  <div class="info float-left">
    <span class="date">{new Date(date).toDateString()}</span>
  </div>

  <div class="quantity-of-words float-right">{words()} words</div>

</div>
