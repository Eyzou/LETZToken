<template>
  <a @click.prevent="click" class="btn">{{ content }}</a>
</template>

<script setup>

import {useUser} from "@/stores/user.js";

const props = defineProps({
  content: String,
})

const store = useUser()

const click = async () => {
  try {
    await store.initializeProvider()

    emit('connect');
  } catch (e) {
    console.error(e)
  }
  store.initializeMetamaskHook()
}

const emit = defineEmits(['connect'])

</script>

<style lang="scss">

@import "./scss/variables";

a {
  font-size: 16px;
  transition: all 0.2s;
  width: fit-content;
}

a.btn:hover {
  background-color: $hoverGreen;
  color: black;
}

.btn {
  padding: 16px 32px;
  background-color: $green;
}

</style>