<template>

  <div class="nav" :aria-busy="state === 'loading'">
    <ConnectButton v-if="!store.isAuth" :href="'./'" :content="'Connect wallet'"></ConnectButton>
    <div v-else class="user-data">
      <div class="picture"></div>
      <p class="name">Alice Michu</p>
      <p class="wallet">{{ shortenString(store.user, 25) }}</p>
      <div class="currencies-container">
        <Currency :name="'LETZ'" :img="'./src/img/soge.png'">{{ store.token }}</Currency>
        <Currency :name="'wXTZ'" :img="'./src/img/wxtz.png'">{{ store.tezos }}</Currency>
      </div>
    </div>
    <ul>
      <ListLink href="/Dashboard" :class="{'active' : activate == 'Dashboard'}">Dashboard</ListLink>
      <ListLink href="/Governance" :class="{'active' : activate == 'Governance'}">Governance</ListLink>
      <ListLink href="/Buy" :class="{'active' : activate == 'Buy/Sell'}">Buy/Sell</ListLink>
    </ul>
  </div>

</template>

<script setup>

import {onMounted, ref} from "vue";
import ListLink from "@/ListLink.vue";
import Currency from "@/Currency.vue";
import {getProvider} from "@/JS/ethersService.js";
import ConnectButton from "@/ConnectButton.vue";
import {useUser} from "@/stores/user.js";

const state = ref('loading')
const store = useUser();



const props = defineProps({
  activate: String,
})

const shortenString = (str, maxLength) => {
  if (!str)
    return "";
  if (str.length > maxLength) {
    return str.slice(0, maxLength - 3) + '...';
  }
  return str;
}

</script>

<style lang="scss">

@import "scss/variables";

.nav {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
  background-color: $darkGreen;
  flex-direction: column;

  .btn {
    height: fit-content;
    margin: 35px auto;
  }

  ul {
    position: fixed;
    top: 40%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 100px;
    width: fit-content;
    margin: 8vh 0px 0px 50px;
  }

  .user-data {
    .picture {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: $grey;
      margin: 30px auto 15px;
    }

    p.name, p.wallet {
      color: $grey;
      margin: 0 auto;
      width: fit-content;
    }

    p.wallet {
      opacity: 0.6;
    }
  }

  .currencies-container {
    margin: 20px auto;
    display: flex;
    gap: 7px;
    flex-direction: column;
    width: 80%;
  }
}


</style>