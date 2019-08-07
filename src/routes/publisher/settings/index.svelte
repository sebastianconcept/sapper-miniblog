<script>
  import { goto, stores } from "@sapper/app";
  import ListErrors from "../../../components/ListErrors.svelte";
  import SettingsForm from "./SettingsForm.svelte";
  import { post } from "../../../utils.js";

  let inProgress;
  let errors;

  const { session } = stores();

  async function save(event) {
    inProgress = true;
    const response = await post(`auth/save`, event.detail);

    errors = response.errors;
    if (response.user) $session.user = response.user;

    inProgress = false;
  }
</script>

<svelte:head>
  <title>Settings • miniblog</title>
</svelte:head>

<div class="settings-page">
  <div class="container page">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">

        <h1 class="text-xs-center">Blog Settings</h1>

        <ListErrors {errors} />

        <SettingsForm on:save={save} {...$session.user} {inProgress} />

        <hr />

      </div>
    </div>
  </div>
</div>
