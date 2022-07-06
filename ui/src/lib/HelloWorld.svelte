<script lang="ts">
  import { GreeterClient } from '../generated/helloworld.client';
  import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';

  const transport = new GrpcWebFetchTransport({baseUrl: ""});
  const greeterClient = new GreeterClient(transport);
  let name: string = '';
  let greeting: string = '';

  async function getGreeting() {
    const {response} = await greeterClient.sayHello({name});
    greeting = response.message;
  }
</script>

<label for="name">Name</label>
<input type="text" bind:value="{name}">
<button on:click={getGreeting}>
  Get Greeting
</button>
<div>{greeting}</div>

<style>
</style>
