<script>
  // import { goto, stores } from "@sapper/app";
  // import { onMount } from "svelte";

  // const { page, session } = stores();

  // onMount(() => {
  //   if (!$session.user) {
  //     goto("/blog");
  //   }
  // });
</script>

<style>
  main {
    position: relative;
    max-width: 56em;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>

<main>
  <slot />
</main>
