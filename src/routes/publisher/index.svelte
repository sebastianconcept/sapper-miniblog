<script>
  import { goto, stores } from "@sapper/app";
  import ListErrors from "../../components/ListErrors.svelte";
  import { post } from "../../utils.js";

  async function handleClick(event) {
    const response = await post(`auth/sign-out`);
  }
</script>

<p>Drafts</p>
<p>Published</p>
<button on:click={handleClick}>Logout</button>
