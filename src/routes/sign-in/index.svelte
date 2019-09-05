<script>
  import { goto, stores } from "@sapper/app";
  import ListErrors from "../../components/ListErrors.svelte";
  import { post } from "../../utils.js";

  const { session } = stores();

  let email = "";
  let password = "";
  let errors = null;

  async function submit(event) {
    let initialPath;
    const response = await post(`auth/sign-in`, { email, password });
    // TODO handle network errors
    errors = response.errors;
    if (!errors) {
      $session.user = response.user;
      console.log("$session.initialPath", $session.initialPath);

      if ($session.initialPath === "/") {
        initialPath = "/publisher";
      }
      goto(initialPath || $session.initialPath);
    }
  }
</script>

<style>
  .sign-in-container {
    margin-top: 4em;
  }
</style>

<svelte:head>
  <title>Sign in • miniblog</title>
</svelte:head>
<div class="container grid-lg sign-in-container">
  <div class="columns">
    <div class="column col-xs-6 ">
      <form on:submit|preventDefault={submit}>
        <div class="panel">
          <div class="panel-header">
            <div class="panel-title">
              <h1 class="text-xs-center">Sign In</h1>
            </div>
          </div>
          <div class="panel-body">
            <ListErrors {errors} />
            <fieldset class="form-group">
              <label class="form-label" for="email">E-Mail</label>
              <input
                class="form-input"
                type="email"
                name="email"
                placeholder="Email"
                bind:value={email} />
            </fieldset>
            <fieldset class="form-group">
              <label class="form-label" for="password">Password</label>
              <input
                class="form-input"
                type="password"
                name="password"
                placeholder="Password"
                bind:value={password} />
            </fieldset>
          </div>
          <div class="panel-footer">
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              type="submit"
              disabled={!email || !password}>
              Sign in
            </button>
          </div>

        </div>
      </form>
    </div>
  </div>
</div>
