<script lang="ts">
  import { user } from "$stores/global";
  import { scheduleLocalNotification } from "$utils/scheduleNotification";
  import { updateLocalUser } from "$utils/updateUser";

  const urlHome = "/home";
  let waterLevel = $user.waterLevel;
  let doseOfWater = $user.doseOfWater;
  let waterPerDay = $user.waterPerDayInML;

  async function updateUserWaterLevel() {
    user.update((u) => {
      if (!u.waterLevel) {
        u.waterLevel = 0;
        updateLocalUser(u).catch(() => {
          alert("Houve um erro ao alterar o seu nível de água consumido");
        });
      }
      if (u) {
        u.waterLevel += waterLevel;
        updateLocalUser(u).catch(() => {
          alert("Houve um erro ao alterar o seu nível de água consumido");
        });
      }
      return u;
    });

    await scheduleLocalNotification(15, $user, urlHome);
  }

  async function resetUserWaterLevel() {
    user.update((u) => {
      u.waterLevel = 0;
      updateLocalUser(u).catch(() => {
        alert("Houve um erro ao alterar o seu nível de água consumido");
      });
      return u;
    });
    await scheduleLocalNotification(15, $user, urlHome);
  }

  async function updateUserWaterPerDay() {
    user.update((u) => {
      u.waterPerDayInML = waterPerDay;
      updateLocalUser(u).catch(() =>
        alert("Houve um erro atualizar a dose diária de água")
      );
      return u;
    });
    await scheduleLocalNotification(15, $user, urlHome);
  }

  async function updateDoseOfWater() {
    user.update((u) => {
      u.doseOfWater = doseOfWater;
      updateLocalUser(u).catch(() => {
        alert("Houve um erro ao alterar a sua dose de água");
      });
      return u;
    });
    await scheduleLocalNotification(15, $user, urlHome);
  }
</script>

<div>
  <h1>Home User</h1>
  <h2>Acompanhe quanta água você já bebeu</h2>
  <h3>{$user.waterLevel ?? 0} de {$user.waterPerDayInML}ml</h3>

  <button on:click={updateUserWaterLevel}>Adicionar</button>
  <input
    type="number"
    max="2000"
    bind:value={waterLevel}
  />
  <button
    on:click={async () => {
      await resetUserWaterLevel();
    }}>Resetar</button
  >
  <h2>Ajuste a dose de água</h2>
  <input
    type="range"
    bind:value={doseOfWater}
    on:change={updateDoseOfWater}
    min="0"
    max="500"
  />
  {doseOfWater}
  <br />
  <h2>Ajuste de quantidade de água por dia</h2>
  <button on:click={updateUserWaterPerDay}
    >Alterar quantidade de água por dia</button
  >
  <input
    type="number"
    min="0"
    max="3000"
    bind:value={waterPerDay}
  />
  {waterPerDay}
</div>

<style lang="scss">
</style>
