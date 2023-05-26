<script lang="ts">
  import { user } from "$stores/global";
  import { tick } from "svelte";
  import { push } from "svelte-spa-router";
</script>

<div>
  <article>
    <h1>K-fit</h1>
    <h3>Você deve logar no app para ter acesso a todos os recursos!</h3>
  </article>
  <button
    on:click={() => {
      push("/home")
        .then(async () => {
          await tick();
          $user = { email: "teste", name: "kaio" };
        })
        .catch((e) => {
          throw e;
        });
    }}>Entrar</button
  >
</div>

<style lang="scss">
  h1 {
    text-align: center;
    color: map-get($pallete, accent-blue);
  }
</style>
