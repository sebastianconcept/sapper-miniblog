<script>
  import { createEventDispatcher } from "svelte";

  export let selected;
  const dispatch = createEventDispatcher();
</script>

<style>

</style>

<button on:click={() => dispatch('published')}>Published</button>
<button on:click={() => dispatch('drafts')}>Drafts</button>
<button on:click={() => dispatch('all')}>All</button>
