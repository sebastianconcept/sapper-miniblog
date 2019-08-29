<script>
  import { stores } from "@sapper/app";
  import { onMount } from "svelte";
  import Home from "../components/Home";

  const { session, page } = stores();

  onMount(() => {
    !!$page.query.search
      ? ($session.search = $page.query.search)
      : ($session.search = "");
  });
</script>

<svelte:head>
  <title>Miniblog</title>
</svelte:head>

<Home />
