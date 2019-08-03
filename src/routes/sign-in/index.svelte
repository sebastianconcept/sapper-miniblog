<script>
  import { goto, stores } from "@sapper/app";
  import ListErrors from "../../components/ListErrors.svelte";
  import { post } from "../../utils.js";

  const { session } = stores();

  let email = "";
  let password = "";
  let errors = null;

  async function submit(event) {
    const response = await post(`auth/sign-in`, { email, password });
    // TODO handle network errors
    errors = response.errors;
    if (!errors) {
      goto("/publisher");
    }
  }
</script>

<svelte:head>
  <title>Sign in • miniblog</title>
</svelte:head>

<div class="auth-page">
  <div class="container page">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Sign In</h1>

        <ListErrors {errors} />

        <form on:submit|preventDefault={submit}>
          <fieldset class="form-group">
            <input
              class="form-control form-control-lg"
              type="email"
              placeholder="Email"
              bind:value={email} />
          </fieldset>
          <fieldset class="form-group">
            <input
              class="form-control form-control-lg"
              type="password"
              placeholder="Password"
              bind:value={password} />
          </fieldset>
          <button
            class="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            disabled={!email || !password}>
            Sign in
          </button>
        </form>
      </div>
    </div>
  </div>
</div>
