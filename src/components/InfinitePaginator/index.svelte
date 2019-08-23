<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { throttle } from "throttle-debounce";

  let io;
  let paginator;
  const dispatch = createEventDispatcher();
  const threshold = 150;

  const paginate = throttle(threshold, () => {
    dispatch("paginate");
  });

  onMount(() => {
    io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        paginate();
      }
    });
    io.observe(paginator);

    return () => io.disconnect();
  });
</script>

<div bind:this={paginator} />
