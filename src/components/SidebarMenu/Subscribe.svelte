<script>
  import { createEventDispatcher } from "svelte";

  export let emailAddress = "";
  const dispatch = createEventDispatcher();
  function onSubmit(event) {
    dispatch("subscribe", { email: emailAddress });
  }
</script>

<style>
  h4 {
    color: #fff;
  }
</style>

<div class="publisher-search">
  <form on:submit|preventDefault={onSubmit}>
    <h4>Subscribe</h4>

    <fieldset class="form-group">
      <input
        class="form-control form-control-lg"
        type="text"
        placeholder="Your email address"
        bind:value={emailAddress} />
    </fieldset>
    <button on:click={onSubmit}>Subscribe</button>
  </form>
</div>
