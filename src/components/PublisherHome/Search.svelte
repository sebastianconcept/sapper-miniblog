<script>
  import { createEventDispatcher } from "svelte";
  import { debounce } from "throttle-debounce";
  export let target = "";

  const dispatch = createEventDispatcher();
  const searchDebouceDelay = 500;

  function onSubmit(event) {
    dispatch("search", { target: target });
  }

  function basicSearch() {
    // console.log("basicSearch", target);
    dispatch("search", { target });
  }

  function onSearch() {
    return debounce(searchDebouceDelay, () => basicSearch());
  }
</script>

<div class="publisher-search">
  <form on:submit|preventDefault={onSubmit}>
    <fieldset class="form-group">
      <input
        class="form-control form-control-lg"
        type="text"
        placeholder="Search title, tag or content"
        on:keyup={onSearch()}
        bind:value={target} />
    </fieldset>
    <button on:click={onSubmit}>Find</button>
  </form>
</div>
