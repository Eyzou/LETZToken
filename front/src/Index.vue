<template>
  <Navbar/>
  <section id="content">
    <div class="header-container">
      <h3>Please connect your wallet</h3>
      <p>Please connect your wallet to see your investments, ESG score and fund governance agenda</p>
      <ConnectButton :content="'Connect Wallet'" :href="'/Dashboard'"/>
    </div>
    <RouterView></RouterView>
  </section>
</template>

<script setup>
import Navbar from "@/Navbar.vue";
import ConnectButton from "@/ConnectButton.vue";
</script>

<style>

#content {
  margin-left: 300px;
}

.header-container {
  display: flex;
  flex-direction: column;
  max-width: 800px;
  padding: 50px;
  gap: 15px;
  background-color: white;
  margin: 100px auto;
}
</style>