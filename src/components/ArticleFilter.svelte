<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  async function onPublished(event) {
    dispatch("published");
  }

  async function onDrafts(event) {
    dispatch("drafts");
  }

  async function onAll(event) {
    dispatch("all");
  }
</script>

<div class="btn-group ">
  <button class="btn btn-lg" on:click={onPublished}>Published</button>
  <button class="btn btn-lg" on:click={onDrafts}>Drafts</button>
  <button class="btn btn-lg" on:click={onAll}>All</button>
</div>
