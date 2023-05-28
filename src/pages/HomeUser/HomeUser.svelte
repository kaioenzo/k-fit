<script lang="ts">
  import {
    LocalNotifications,
    type ScheduleOptions,
  } from "@capacitor/local-notifications";
  import { Preferences } from "@capacitor/preferences";
  import { onMount } from "svelte";
  type User = {
    waterLevel: number;
  };

  let waterLevel: number | undefined;
  let user: User | undefined;

  async function setUserWaterLevel() {
    await Preferences.set({
      key: "user",
      value: JSON.stringify({
        waterLevel: user.waterLevel + waterLevel,
      }),
    });
    await getUserWaterLevel();
  }

  async function getUserWaterLevel() {
    const ret = await Preferences.get({ key: "user" });
    user = JSON.parse(ret.value) as unknown as User;
    console.log(user);
  }

  async function resetUserWaterLevel() {
    await Preferences.set({
      key: "user",
      value: JSON.stringify({
        waterLevel: 0,
      }),
    });
    await getUserWaterLevel();
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
            url: "/profile",
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

  onMount(async () => {
    await getUserWaterLevel();
  });
</script>

<div>
  <h1>Home User</h1>
  <h2>Your water level is</h2>
  <button on:click={scheduleNotification}>Add water</button>
  <input
    type="number"
    max="2000"
    bind:value={waterLevel}
  />
  <button
    on:click={() => {
      resetUserWaterLevel;
      scheduleNotification;
    }}>Reset</button
  >
  {#if user}
    <h3>{user.waterLevel ?? 0}ml of 2000ml</h3>
  {/if}
</div>

<style lang="scss">
</style>
