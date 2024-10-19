<template>

  <div class="currency-container">
    <div class="currency">
      <img :src="img" alt="Currency Logo">
      <p>{{ name }}</p>
    </div>
    <p class="amount">
      <slot></slot>
    </p>
  </div>

</template>

<script setup>

const props = defineProps({
  img: String,
  name: String,
})

</script>

<style lang="scss">

@import "scss/variables";

.currency-container {
  color: $grey;
  font-family: $open, sans-serif;
  display: flex;
  justify-content: space-between;

  .currency {
    display: flex;
    gap: 10px;
    align-items: center;

    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
}

</style>