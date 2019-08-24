<script>
  import { createEventDispatcher } from "svelte";
  import { debounce } from "throttle-debounce";
  export let searchTarget = "";

  const dispatch = createEventDispatcher();
  const searchDebouceDelay = 500;

  function onSubmit(event) {
    dispatch("search", { target: searchTarget });
  }

  function basicSearch() {
    // console.log("basicSearch", target);
    dispatch("search", { target: searchTarget });
  }

  function onSearch() {
    return debounce(searchDebouceDelay, () => basicSearch());
  }

  function onReset(event) {
    searchTarget = "";
    onSubmit(event);
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
        bind:value={searchTarget} />
      <button>Find</button>
      <button on:click={onReset}>Reset</button>
    </fieldset>
  </form>
</div>
