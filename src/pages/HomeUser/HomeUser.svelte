<script lang="ts">
  import { user } from "$stores/global";
  import {
    LocalNotifications,
    type ScheduleOptions,
  } from "@capacitor/local-notifications";
  import { Preferences } from "@capacitor/preferences";

  let waterLevel: number | undefined;

  async function updateUserWaterLevel() {
    await Preferences.set({
      key: "user",
      value: JSON.stringify({
        name: $user.name,
        email: $user.email,
        image: $user.image,
        waterLevel: $user.waterLevel + waterLevel,
      }),
    });

    user.update((u) => {
      if (!u.waterLevel) {
        u.waterLevel = 0;
      }
      if (u) {
        u.waterLevel += waterLevel;
      }
      return u;
    });
  }

  async function resetUserWaterLevel() {
    await Preferences.set({
      key: "user",
      value: JSON.stringify({
        name: $user.name,
        email: $user.email,
        image: $user.image,
        waterLevel: 0,
      }),
    });
    user.update((u) => {
      u.waterLevel = 0;
      return u;
    });
  }

  async function scheduleNotification() {
    try {
      await LocalNotifications.removeAllDeliveredNotifications();
    } catch (ex) {
      alert(ex);
    }

    let options: ScheduleOptions = {
      notifications: [
        {
          id: 111,
          title: "Não esqueça de beber água!",
          body: "Espcecialistas recomendam beber no mínimo 2l de água por dia",
          smallIcon: "res://drawable/splash",
          summaryText: "Summary text",
          extra: {
            url: "/home",
          },
        },
      ],
    };

    try {
      await LocalNotifications.schedule(options);
    } catch (ex) {
      console.error(ex);
    }
  }
</script>

<div>
  <h1>Home User</h1>
  <h2>Your water level is</h2>
  <button on:click={updateUserWaterLevel}>Add water</button>
  <input
    type="number"
    max="2000"
    bind:value={waterLevel}
  />
  <button
    on:click={async () => {
      await resetUserWaterLevel();
      await scheduleNotification();
    }}>Reset</button
  >
  {#if $user}
    <h3>{$user.waterLevel ?? 0}ml of 2000ml</h3>
  {/if}
</div>

<style lang="scss">
</style>
