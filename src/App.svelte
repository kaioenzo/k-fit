<script lang="ts">
  import BottomNavigation from "$components/BottomNavigation/BottomNavigation.svelte";
  import Header from "$components/Header/Header.svelte";
  import { user } from "$stores/global";
  import type { UserStore } from "$types/global-stores";
  import type { NotificationDeliveredData } from "$types/utils";
  import {
    LocalNotifications,
    type ActionPerformed,
  } from "@capacitor/local-notifications";
  import { Preferences } from "@capacitor/preferences";
  import dayjs from "dayjs";
  import customParseFormat from "dayjs/plugin/customParseFormat";
  import { onDestroy, onMount, tick } from "svelte";
  import Router, { push } from "svelte-spa-router";
  import { conditionsFailHandler, routeLoadingHandler, routes } from "./routes";
  // dayjs.extend(utc);
  dayjs.extend(customParseFormat);

  let userPersistedData: UserStore;

  onMount(async () => {
    await loginUser();
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

  async function loginUser() {
    const ret = await Preferences.get({ key: "user" });
    if (!ret.value) {
      userPersistedData = {
        email: "kaio@mail.com",
        name: "Kaio",
        waterLevel: 0,
        doseOfWater: 200,
        startNotificationHour: "08:00",
        endNotificationHour: "23:00",
      };
      await Preferences.set({
        key: "user",
        value: JSON.stringify(userPersistedData),
      });
    } else {
      userPersistedData = JSON.parse(ret.value) as UserStore;
    }

    user.update(() => userPersistedData);

    push("/home")
      .then(async () => {
        await tick();
      })
      .catch((e) => {
        throw e;
      });
  }

  onDestroy(async () => {
    await LocalNotifications.removeAllListeners();
  });
</script>

<header>
  <Header
    user={$user}
    on:login={loginUser}
    on:logout={() => {
      push("/")
        .then(async () => {
          $user = null;
          await tick();
        })
        .catch((e) => {
          throw e;
        });
    }}
    on:createAccount={() => loginUser}
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
