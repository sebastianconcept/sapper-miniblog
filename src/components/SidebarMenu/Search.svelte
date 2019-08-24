<script>
  import { createEventDispatcher } from "svelte";

  export let target = "";
  const dispatch = createEventDispatcher();

  function onSubmit(event) {
    dispatch("search", { target: target });
  }

  function onReset(event) {
    target = "";
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
        bind:value={target} />
      <button class="button">Find</button>
      <button class="button" on:click={onReset} disabled={!target}>
        reset
      </button>
    </fieldset>
  </form>
</div>
