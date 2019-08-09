<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  async function onPublished(event) {
    dispatch("publihed");
  }

  async function onDrafts(event) {
    dispatch("drafts");
  }

  async function onAll(event) {
    dispatch("all");
  }
</script>

<nav class="navbar navbar-light">
  <div class="container">
    <ul class="nav navbar-nav pull-xs-right">
      <li class="nav-item">
        <button on:click={onPublished}>Published</button>
      </li>
      <li class="nav-item">
        <button on:click={onDrafts}>Drafts</button>
      </li>
      <li class="nav-item">
        <button on:click={onAll}>All</button>
      </li>
    </ul>
  </div>
</nav>
