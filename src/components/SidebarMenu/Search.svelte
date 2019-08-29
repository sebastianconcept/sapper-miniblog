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

<div class="publisher-search">
  <form on:submit|preventDefault={onSubmit}>
    <h4>Search</h4>

    <fieldset class="form-group">
      <input
        class="form-control form-control-lg"
        type="text"
        placeholder="Search title, tag or content"
        bind:value={searchTarget} />
      <button class="button">Find</button>
      <button class="button" on:click={onReset} disabled={!searchTarget}>
        reset
      </button>
    </fieldset>
  </form>
</div>
