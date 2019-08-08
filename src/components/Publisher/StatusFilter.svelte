<script>
  import { createEventDispatcher } from "svelte";

  export let selected;
  const dispatch = createEventDispatcher();
</script>

<style>

</style>

<ul>
  <li>
    <button on:click={() => dispatch('published')}>Published</button>
  </li>
  <li>
    <button on:click={() => dispatch('drafts')}>Drafts</button>
  </li>
  <li>
    <button on:click={() => dispatch('all')}>All</button>
  </li>
</ul>
