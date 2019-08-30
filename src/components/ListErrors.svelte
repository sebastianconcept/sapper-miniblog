<script>
  export let errors;
</script>

<style>
  .error-messages {
    list-style: none;
  }
  .error-messages li {
    color: red;
  }
</style>

{#if errors}
  <ul class="error-messages">
    {#each Object.keys(errors) as key}
      <li>{key} {errors[key]}</li>
    {/each}
  </ul>
{/if}
