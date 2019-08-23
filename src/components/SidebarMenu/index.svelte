<script>
  import Brand from "./Brand";
  import Search from "./Search";
  import Subscribe from "./Subscribe";
  import TopTen from "./TopTen";
  import Tags from "./Tags";
  import About from "./About";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function onSearch(event) {
    dispatch("search", event.detail);
  }
</script>

<style>

</style>

<div class="sidebar">
  <Brand />
  <Search on:search={onSearch} />
  <!-- <Subscribe /> -->
  <!-- <TopTen /> -->
  <!-- <Tags /> -->
  <About />

</div>
