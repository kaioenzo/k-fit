<script lang="ts">
  import { user } from "$stores/global";
  import { scheduleLocalNotification } from "$utils/scheduleNotification";
  import { updateLocalUser } from "$utils/updateUser";
  import { onMount } from "svelte";

  const urlBreak = "/breaks";
  let breaks: number;

  async function addBreak() {
    user.update((u) => {
      u.breaks += 1;
      u.breaksMinutes += breaks;
      updateLocalUser(u).catch(() =>
        alert("Houve um erro ao adicionar uma pausa!")
      );
      return u;
    });
    await scheduleLocalNotification(30, $user, urlBreak);
    breaks = 0;
  }

  onMount(() => {
    breaks = $user.breaks;
  });
</script>

<div class="container justify-center">
  <h1>Registre sua pausas para alongamento</h1>
  <div class="container justify-center text-center breaks-main">
    <h2>Você já fez: {$user.breaks} pausas</h2>
    <h3>Isso dá {$user.breaksMinutes} minutos de alongamento hoje</h3>
    <h4>Adicionar pausa</h4>
    <div class="breaks-add-pause">
      <input
        type="number"
        placeholder="Digite o tempo da pausa"
        bind:value={breaks}
      />
      <button
        on:click={addBreak}
        class="add-button">Adicionar</button
      >
    </div>
  </div>
</div>

<style lang="scss">
  .container {
    padding-top: 1rem;
  }

  h1 {
    font-size: 1.2rem;
    text-align: center;
  }

  .breaks-main {
    margin-top: 1rem;
  }
  .breaks-main h2,
  h3,
  h4 {
    margin-top: 0.5rem;
  }

  .breaks-add-pause {
    margin-top: 1.5rem;
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
</style>
