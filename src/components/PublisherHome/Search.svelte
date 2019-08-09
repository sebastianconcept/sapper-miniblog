<script>
  import { createEventDispatcher } from "svelte";

  export let target = "";
  const dispatch = createEventDispatcher();

  function onSubmit(event) {
    dispatch("search", { target: target });
  }
</script>

<div class="publisher-search">
  <form on:submit|preventDefault={onSubmit}>
    <fieldset class="form-group">
      <input
        class="form-control form-control-lg"
        type="text"
        placeholder="Search title, tag or content"
        bind:value={target} />
    </fieldset>
    <button on:click={onSubmit}>Find</button>
  </form>
</div>
