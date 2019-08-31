<script>
  import { onMount } from "svelte";

  import { goto, stores } from "@sapper/app";
  const { session, page } = stores();

  $session.search = $page.query.search || "";

  export let searchTarget = $session.search;

  function onSubmit(event) {
    if (searchTarget !== $session.search) {
      $session.search = searchTarget;
      goto(`/?search=${$session.search}`);
    }
  }

  function onReset(event) {
    searchTarget = "";
    onSubmit(event);
  }
</script>

<section class="sidebar-section">
  <div class="publisher-search">
    <form class="form-group" on:submit|preventDefault={onSubmit}>
      <div class="input-group">
        <input
          class="form-input"
          type="text"
          placeholder="Search title, tag or content"
          bind:value={searchTarget} />
        <div class="btn-group form-inline">
          <button class="btn input-group-btn" type="submit">
            <i class="icon icon-search" />
          </button>
          {#if searchTarget}
            <button class="btn input-group-btn" on:click={onReset}>
              <i class="icon icon-refresh" />
            </button>
          {/if}
        </div>
      </div>
    </form>
  </div>
</section>
