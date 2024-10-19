<template>
  <Navbar activate="Buy/Sell"/>
  <section id="transaction">
    <div v-if="store.state === 'Pending'" class="container">
      <h1>Pending transaction</h1>
      <p>Please wait for the transaction end...</p>
      <Loading/>
    </div>
    <div v-else-if="store.state === 'Confirm'" class="container">
      <h1>Pending transaction</h1>
      <p>Please confirm the transaction.</p>
      <Loading/>
    </div>
    <div v-else-if="store.state === 'Completed'" class="container">
      <h1>Transaction completed</h1>
      <p>Thank you for the transaction.</p>
      <RouterLink to="/Dashboard" class="btn">Go to Dashboard</RouterLink>
    </div>
    <div v-else-if="store.state === 'Error'" class="container">
      <h1>Transaction failed</h1>
      <p>Something went wrong.</p>
      <RouterLink to="/Dashboard" class="btn">Go to Dashboard</RouterLink>
    </div>
  </section>
</template>

<script setup>

import Navbar from "@/Navbar.vue";
import Loading from "@/Loading.vue";
import {useUser} from "@/stores/user.js";
import {useRouter} from "vue-router";

const store = useUser()

if (store.state === "")
  useRouter().push("/Dashboard");


</script>


<style scoped lang="scss">
.container {
  align-items: center;
  gap: 10px;
}

.loader {
  margin-top: 100px;
}

#transaction .container .btn {
  margin-top: 180px;
}
</style>