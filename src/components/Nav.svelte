<script>
  import { stores, goto } from "@sapper/app";
  import { post } from "../utils.js";

  const { page, session } = stores();

  async function onSignOut(event) {
    const response = await post(`auth/sign-out`);
    deleteUidCookie();
    $session.user = null;
    goto("/blog");
  }

  function deleteUidCookie() {
    document.cookie = "uid= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  }
</script>

<nav class="navbar navbar-light">
  <div class="container">
    <!-- <a rel='prefetch' class="navbar-brand" href=".">Brand</a> -->
    <ul class="nav navbar-nav pull-xs-right">
      <li class="nav-item">
        <a
          rel="prefetch"
          href="/publisher/drafts"
          class="nav-link"
          class:active={$page.path === '/publisher/drafts'}>
          Drafts
        </a>
      </li>

      <li class="nav-item">
        <a
          rel="prefetch"
          href="/publisher/published"
          class="nav-link"
          class:active={$page.path === '/publisher/published'}>
          Published
        </a>
      </li>
      <li class="nav-item">
        <a
          rel="prefetch"
          class="nav-link"
          class:active={$page.path === '/'}
          href="/">
          Blog
        </a>
      </li>
      <li class="nav-item">
        <button on:click={onSignOut}>Sign out</button>
      </li>

    </ul>
  </div>
</nav>
