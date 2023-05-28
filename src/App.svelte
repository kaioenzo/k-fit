<script lang="ts">
  import lunaImg from "$assets/Luna.jpg";
  import BottomNavigation from "$components/BottomNavigation/BottomNavigation.svelte";
  import Header from "$components/Header/Header.svelte";
  import { user } from "$stores/global";
  import type { NotificationDeliveredData } from "$types/utils";
  import {
    LocalNotifications,
    type ActionPerformed,
  } from "@capacitor/local-notifications";
  import { onDestroy, onMount, tick } from "svelte";
  import Router, { push } from "svelte-spa-router";
  import { conditionsFailHandler, routeLoadingHandler, routes } from "./routes";

  const userMock = {
    name: "Kaio Enzo",
    image: lunaImg,
    email: "teste@mail.com",
  };
  onMount(async () => {
    await LocalNotifications.addListener(
      "localNotificationActionPerformed",
      (notification: ActionPerformed) => {
        let jsonData = JSON.stringify(notification.notification.extra);
        let data = JSON.parse(jsonData) as NotificationDeliveredData;

        if (data.url) {
          push(data.url)
            .then(async () => {
              await tick();
            })
            .catch((e) => {
              throw e;
            });
        }
      }
    );
  });

  onDestroy(async () => {
    await LocalNotifications.removeAllListeners();
  });
</script>

<header>
  <Header
    user={$user}
    on:login={() => {
      $user = userMock;
      push("/home")
        .then(async () => {
          await tick();
        })
        .catch((e) => {
          throw e;
        });
    }}
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
  <BottomNavigation />
</main>

<style lang="scss">
  main {
    padding: 0.5rem;
  }
</style>
