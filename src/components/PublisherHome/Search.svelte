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

<style>
  .publisher-search {
    margin: 2em 0;
  }
</style>

<div class="publisher-search">
  <form class="" on:submit|preventDefault={onSubmit}>
    <div class="form-group">
      <div class="input-group ">
        <input
          class="form-input"
          autocomplete="off"
          type="text"
          name="search"
          placeholder="Search title, tag or content"
          on:keyup={onSearch()}
          bind:value={searchTarget} />
        <button class="btn btn-primary " type="submit">Find</button>
        <button class="btn input-group-btn" on:click|preventDefault={onReset}>
          Reset
        </button>
      </div>
    </div>
  </form>
</div>
