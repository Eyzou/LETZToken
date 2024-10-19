<template>
  <Navbar activate="Buy/Sell"></Navbar>
  <section id="transaction">
    <div class="container">
      <h1>Buy LETZ with wXTZ</h1>
      <div class="input-container">
        <input placeholder="LETZ" type="number" v-model="amount">
        <input class="disabled" placeholder="wXTZ" type="number" disabled :value="amount">
        <!--        <RouterLink to="/Sell" class="switch"><img src="./img/switch.png" alt="Switch Button"></RouterLink>-->
      </div>
      <button @click.prevent="store.buyToken(amount, this.$router)" class="btn">Buy LETZ</button>
    </div>
  </section>
</template>

<script setup>

import Navbar from "@/Navbar.vue";
import {ref} from "vue";
import {useUser} from "@/stores/user.js";
import Loading from "@/Loading.vue";
import {useRouter} from "vue-router";

const amount = ref(null);

const store = useUser()
</script>

<style lang="scss">

@import "scss/variables";

#transaction {
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 300px;

  .container {
    background-color: $darkGreen;
    width: 800px;
    padding: 80px 120px;
    height: 500px;
    display: flex;
    flex-direction: column;

    .btn {
      margin-top: 30px;
    }
  }

  .input-container {
    position: relative;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 40px;

    input {
      width: 100%;
      font-size: 14px;
      padding: 15px;
      background-color: $grey;
    }

    .disabled {
      background-color: #cec6c6;
    }
  }

  .switch {
    width: fit-content;
    background-color: $darkGreen;
    border-radius: 100%;
    position: absolute;
    margin: 0 auto;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;

    img {
      width: 55px;
      height: 55px;
      border-radius: 100%;
      display: block;
    }
  }

  h1, p {
    color: $white;
    margin-bottom: 10px;
  }

  .btn {
    font-size: 16px;
    transition: all 0.2s;
    width: fit-content;
  }

  .btn:hover {
    background-color: $hoverGreen;
    color: black;
  }

  .btn {
    padding: 16px 32px;
    background-color: $green;
  }
}


</style>