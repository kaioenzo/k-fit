<script lang="ts">
  import lunaImg from "$assets/Luna.jpg";
  import { user } from "$stores/global";
  import { Meta, Story } from "@storybook/addon-svelte-csf";
  import Profile from "./Profile.svelte";

  $user = {
    name: "Victor Gris",
    image: lunaImg,
    email: "Teste",
  };
</script>

<Meta
  title="Pages/Profile"
  component={Profile}
/>

<Story name="Default">
  <Profile />
</Story>
