<script>
  let target = "";
  function onSubmit(event) {
    console.log(`should search for ${target}`);
  }
</script>

<div class="publisher-search">
  <form on:submit|preventDefault={onSubmit}>

    <fieldset class="form-group">
      <input
        class="form-control form-control-lg"
        type="text"
        placeholder="Search title, tag or content"
        bind:value={target} />
    </fieldset>
  </form>
</div>
