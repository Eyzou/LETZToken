<template>

  <div class="fund-container">
    <div class="text-container">
      <h4>{{ name }}</h4>
      <p>
        <slot/>
      </p>
    </div>
    <div class="img-container">
      <img :src="img" alt="Chart">
    </div>
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

.fund-container {
  width: 100%;
  height: 120px;
  background-color: $darkGreen;
  color: $grey;
  display: flex;
  justify-content: space-between;

  .text-container {
    margin: 0 15px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
  }

  .img-container {
    padding: 20px;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      object-fit: contain;
      width: 100%;
      height: 100%;
    }
  }
}

</style>