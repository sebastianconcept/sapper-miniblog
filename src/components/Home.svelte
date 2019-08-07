<script>
  import { onMount } from "svelte";
  import MainView from "./MainView/index.svelte";
  import Tags from "./Tags.svelte";
  import * as api from "../api.js";

  export let p = 1;

  let tab;
  let tag;
  let tags;

  function setTags({ detail }) {
    tag = detail.tag;
    tab = "tag";
  }

  onMount(async () => {
    ({ tags } = await api.get("tags"));
  });
</script>

<style>
  h1,
  figure,
  p {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  figure {
    margin: 0 0 1em 0;
  }

  img {
    width: 100%;
    max-width: 400px;
    margin: 0 0 1em 0;
  }

  p {
    margin: 1em auto;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>

<svelte:head>
  <title>Miniblog</title>
</svelte:head>

<div class="home-page">
  <div class="banner">
    <div class="container">
      <h1 class="logo-font">Miniblog</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">
      <MainView {p} {tag} bind:tab />

      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>
          <Tags {tags} on:select={setTags} />
        </div>
      </div>
    </div>
  </div>
</div>

<figure>
  <figcaption>HIGH FIVE!</figcaption>
</figure>

<p>Sapper miniblog installed and ready to customize!</p>
<p>
  <a href="/publisher">Manage articles</a>
</p>
