<script context="module">
  export function preload(page, session) {
    if (!hasSinedIn(session)) {
      this.redirect(302, "/sign-in");
    }

    function hasSinedIn(session) {
      return !!session.user;
    }
  }
</script>

<script>
  import Nav from "../../components/Nav.svelte";
  export let segment;
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

<!-- {#if preloading}
  <div>Loading...</div>
{/if} -->

<Nav {segment} />

<main>
  <slot />
</main>
