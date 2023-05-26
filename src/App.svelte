<script lang="ts">
  import lunaImg from "$assets/Luna.jpg";
  import Header from "$components/Header/Header.svelte";
  import { user } from "$stores/global";
  import { tick } from "svelte";
  import Router, { push } from "svelte-spa-router";
  import { conditionsFailHandler, routeLoadingHandler, routes } from "./routes";

  const userMock = {
    name: "Kaio Enzo",
    image: lunaImg,
    email: "teste@mail.com",
  };
</script>

<header>
  <Header
    user={$user}
    on:login={() => ($user = userMock)}
    on:logout={() => {
      push("/")
        .then(async () => {
          await tick();
          $user = null;
        })
        .catch((e) => {
          throw e;
        });
    }}
    on:createAccount={() => ($user = userMock)}
  />
</header>
<main>
  <Router
    {routes}
    on:routeLoading={routeLoadingHandler}
    on:conditionsFailed={conditionsFailHandler}
  />
</main>
