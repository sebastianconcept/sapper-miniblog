<script>
  import { debounce } from "throttle-debounce";
  import { stores } from "@sapper/app";

  export let searchTarget = "";

  const { session } = stores();
  const searchDebouceDelay = 500;

  function onSubmit(event) {
    basicSearch();
  }

  function basicSearch() {
    // dispatch("search", { target: searchTarget });
    if (searchTarget !== $session.search) {
      $session.search = searchTarget;
    }
  }

  function onSearch() {
    return debounce(searchDebouceDelay, () => basicSearch());
  }

  function onReset(event) {
    if (!!searchTarget) {
      searchTarget = "";
      onSubmit(event);
    }
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
      <button on:click|preventDefault={onReset}>Reset</button>
    </fieldset>
  </form>
</div>
