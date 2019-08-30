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
        class="form-input "
        type="text"
        placeholder="Search title, tag or content"
        bind:value={searchTarget} />
      <div class="btn-group form-inline">
        <button class="btn btn-primary" type="submit">Find</button>
        {#if searchTarget}
          <button class="btn" on:click={onReset}>Reset</button>
        {/if}
      </div>
    </fieldset>
  </form>
</div>
