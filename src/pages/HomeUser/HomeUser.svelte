<script lang="ts">
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

  onMount(async () => {
    await getUserWaterLevel();
  });
</script>

<div>
  <h1>Home User</h1>
  <h2>Your water level is</h2>
  <button on:click={setUserWaterLevel}>Add water</button>
  <input
    type="number"
    max="2000"
    bind:value={waterLevel}
  />
  <button on:click={resetUserWaterLevel}>Reset</button>
  {waterLevel}
  {#if user}
    <h3>{user.waterLevel}ml of 2000ml</h3>
  {/if}
</div>

<style lang="scss">
</style>
