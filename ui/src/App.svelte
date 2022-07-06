<script lang="ts">
  import logo from './assets/svelte.png'
  import HelloWorld from './lib/HelloWorld.svelte'
</script>

<main>
  <img src={logo} alt="Svelte Logo" />
  <HelloWorld />
</main>

<style>
  img {
    width: 100px;
    height: 100px;
  }
</style>
