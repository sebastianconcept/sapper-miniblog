<script>
  import { stores } from "@sapper/app";
  import ArticlePreview from "./ArticlePreview.svelte";
  import * as api from "../../api.js";

  export let selection = "published";

  const { session, page } = stores();

  let query;
  let articles;
  let articlesCount;

  $: {
    const endpoint = "articles";
    const page_size = 10;
    const p = 1;

    let params = `selection=${selection}&limit=${page_size}&offset=${(p - 1) *
      page_size}`;

    query = `${endpoint}?${params}`;
  }

  $: query && getData();

  async function getData() {
    articles = null;

    // TODO do we need some error handling here?
    ({ articles, articlesCount } = await api.get(
      query,
      $session.user && $session.user.token
    ));
  }
</script>

{#if articles}
  {#if articles.length === 0}
    <div class="article-preview">No articles are here...</div>
  {:else}
    <div>
      {#each articles as article (article.slug)}
        <ArticlePreview {article} user={$session.user} />
      {/each}
    </div>
  {/if}
{:else}
  <div class="article-preview">Loading...</div>
{/if}
