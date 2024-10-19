<template>
  <RouterView></RouterView>
</template>

<script setup>
import Navbar from "@/Navbar.vue";
import ConnectButton from "@/ConnectButton.vue";
import {onMounted} from "vue";
import {useUser} from "@/stores/user.js";

const user = useUser()

onMounted(() => {
  if (user.isAuth) {
    user.initializeProvider()
  }
  user.initializeMetamaskHook()
})
</script>

<style lang="scss">
@import "scss/base";
</style>