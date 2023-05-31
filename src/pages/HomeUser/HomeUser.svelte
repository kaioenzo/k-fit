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

<div class="container flex-column text-center justify-center">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 320"
    ><path
      fill="#0099ff"
      fill-opacity="1"
      d="M0,224L21.8,202.7C43.6,181,87,139,131,128C174.5,117,218,139,262,170.7C305.5,203,349,245,393,250.7C436.4,256,480,224,524,218.7C567.3,213,611,235,655,250.7C698.2,267,742,277,785,245.3C829.1,213,873,139,916,128C960,117,1004,171,1047,208C1090.9,245,1135,267,1178,240C1221.8,213,1265,139,1309,122.7C1352.7,107,1396,149,1418,170.7L1440,192L1440,0L1418.2,0C1396.4,0,1353,0,1309,0C1265.5,0,1222,0,1178,0C1134.5,0,1091,0,1047,0C1003.6,0,960,0,916,0C872.7,0,829,0,785,0C741.8,0,698,0,655,0C610.9,0,567,0,524,0C480,0,436,0,393,0C349.1,0,305,0,262,0C218.2,0,175,0,131,0C87.3,0,44,0,22,0L0,0Z"
    /></svg
  >
  <h1>Home</h1>
  <h3>Acompanhe quanta água você já bebeu</h3>
  <div class="water-level flex-column justify-center">
    <h3>{$user.waterLevel ?? 0} de {$user.waterPerDayInML}ml</h3>
    <input
      type="number"
      max="2000"
      class="input-water-level"
      bind:value={waterLevel}
    />
    <button
      class=" add-button reset-button"
      on:click={async () => {
        await resetUserWaterLevel();
      }}>Resetar</button
    >

    <button
      on:click={updateUserWaterLevel}
      class="add-button">Adicionar</button
    >
  </div>
  <h2>Ajuste a dose de água</h2>
  <div class="water-dose">
    <input
      type="range"
      bind:value={doseOfWater}
      on:change={updateDoseOfWater}
      min="0"
      max="500"
    />
    <span>{doseOfWater}ml</span>
    <br />
  </div>

  <h2>Ajuste de quantidade de água por dia</h2>
  <div class="flex-column text-center justify-center water-per-day">
    <input
      type="number"
      min="0"
      max="3000"
      bind:value={waterPerDay}
    />
    <h5>Atual: {$user.waterPerDayInML}ml</h5>
    <button
      on:click={updateUserWaterPerDay}
      id="button-add-water-level"
      class="add-button">Alterar quantidade de água por dia</button
    >
  </div>
</div>

<style>
  h1,
  h2,
  h3 {
    color: #1e1e1e;
  }

  .water-level {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    padding: 0 1rem 0 1rem;
  }

  .water-dose {
    align-content: baseline;
  }
  .water-dose input {
    width: 50%;
  }

  .water-per-day h5 {
    margin-top: 0.2rem;
    margin-bottom: 0.7rem;
  }

  input {
    text-align: center;
    width: 80%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  #button-add-water-level {
    width: 80%;
  }
  .reset-button {
    background-color: #f14141;
  }
</style>
