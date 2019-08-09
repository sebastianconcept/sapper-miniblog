<script>
  export let tags;
</script>

{#if tags}
  <ul class="tags">
    {#each Object.keys(tags) as key}
      <li>{key} {tags[key]}</li>
    {/each}
  </ul>
{/if}
