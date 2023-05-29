<script lang="ts">
  import { user } from "$stores/global";
  import { tick } from "svelte";
  import { push } from "svelte-spa-router";
</script>

{#if $user}
  <footer>
    <div class="container-row space-around">
      <button
        on:click={() => {
          push("/")
            .then(async () => await tick())
            .catch((e) => {
              throw e;
            });
        }}
      >
        <div>
          <span class="material-symbols-outlined"> home </span>
          <h6>Home</h6>
        </div>
      </button>
      <button
        on:click={() => {
          push("/home")
            .then(async () => await tick())
            .catch((e) => {
              throw e;
            });
        }}
      >
        <div>
          <span class="material-symbols-outlined"> water_loss </span>
          <h6>Água</h6>
        </div>
      </button>
      <button
        on:click={() => {
          push("/breaks")
            .then(async () => await tick())
            .catch((e) => {
              throw e;
            });
        }}
      >
        <div>
          <span class="material-symbols-outlined"> directions_walk </span>
          <h6>Breaks</h6>
        </div>
      </button>
    </div>
  </footer>
{/if}

<style lang="scss">
  footer {
    color: #212427;
    height: 10vh;
    padding: 0.5rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    overflow: hidden;
    position: fixed;
    bottom: 0;
    width: 97%;
  }
  span {
    font-size: 2.2rem;
  }

  button {
    background: transparent;
    width: 30px;
    border: none;
    margin: 0;
    padding: 0;
  }
</style>
