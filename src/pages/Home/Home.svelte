<script lang="ts">
  import { user } from "$stores/global";
  import { push } from "svelte-spa-router";
</script>

<div class="container text-center justify-center flex-column">
  {#if $user === null}
    <article>
      <h1>K-fit</h1>
      <h3>Você deve logar no app para ter acesso a todos os recursos!</h3>
    </article>
    <button>Entrar</button>
  {:else}
    <h1>K-Fit</h1>
    <h2>Gerencie seus melhores hábitos!</h2>
    <div class="container info-card">
      <h3>Hoje você já</h3>
      <div class="container-row container-card-info text-center justify-center">
        <div class="card-water container text-center">
          <h4>
            Bebeu {$user.waterLevel}ml de água
          </h4>
          <button
            on:click={() => {
              push("/home").catch((e) => console.log(e));
            }}
          >
            Beber + água
          </button>
        </div>
        <div class="card-breaks container text-center">
          <h4>
            Fez {$user.breaks} pausas
          </h4>
          <button
            on:click={() => {
              push("/breaks").catch((e) => console.log(e));
            }}
          >
            Fazer +1 pausa
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .container {
    padding: 0.5rem;
  }
  .info-card {
    margin-top: 3rem;
    margin-left: 0.3rem;
    min-height: 30vh;
    margin-right: 0.3rem;
    padding: 1rem;
    border-radius: 30px;
    background: #ebe9e9;
    box-shadow: 15px 15px 30px #bebebe, -15px -15px 30px #ffffff;
    color: rgb(38 50 56);
  }
  .container-card-info {
    padding-top: 1rem;
  }
  .card-water {
    width: 40%;
  }
  .card-water button {
    margin-top: 0.8rem;
  }
  .card-breaks {
    width: 40%;
  }
  .card-breaks button {
    margin-top: 3.1rem;
  }
  h1 {
    color: map-get($pallete, accent-blue);
  }
  h2 {
    color: map-get($pallete, light-blue);
  }

  button {
    border: none;
    color: #fff;
    background-image: linear-gradient(30deg, #0400ff, #4ce3f7);
    border-radius: 20px;
    background-size: 100% auto;
    font-family: inherit;
    font-size: 17px;
    padding: 0.6em 1.5em;
  }

  button:hover {
    background-position: right center;
    background-size: 200% auto;
    // -webkit-animation: pulse 2s;
    // animation: pulse512 1.5s infinite;
  }

  // @keyframes pulse512 {
  //   0% {
  //     box-shadow: 0 0 0 0 #05bada66;
  //   }

  //   70% {
  //     box-shadow: 0 0 0 10px rgb(218 103 68 / 0%);
  //   }

  //   100% {
  //     box-shadow: 0 0 0 0 rgb(218 103 68 / 0%);
  //   }
  // }
</style>
