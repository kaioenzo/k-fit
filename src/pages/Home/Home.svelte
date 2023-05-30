<script lang="ts">
  import { user } from "$stores/global";
</script>

<div>
  {#if !$user}
    <article>
      <h1>K-fit</h1>
      <h3>Você deve logar no app para ter acesso a todos os recursos!</h3>
    </article>
    <button>Entrar</button>
  {/if}
  <h2>K-Fit</h2>
</div>

<style lang="scss">
  h1 {
    text-align: center;
    color: map-get($pallete, accent-blue);
  }
</style>
