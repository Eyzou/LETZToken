<template>
  <div class="achievement">
    <div class="img-container">
      <img :src="img" alt="">
    </div>
    <div class="text-container">
      <h5>{{ title }}</h5>
      <p>{{ text }}</p>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  img: String,
  title: String,
  text: String,
})

</script>

<style scoped lang="scss">

@import "scss/variables";

.achievement {
  border: 1px solid $black;
  width: 90%;
  height: 65px;
  display: flex;

  .img-container {
    width: 30%;
    border-right: 1px solid $black;
    padding: 10px;

    img {
      object-fit: contain;
      width: 100%;
      height: 100%;
    }
  }

  .text-container {
    padding: 5px;
    display: flex;
    flex-direction: column;
    gap: 5px;

    p {
      font-size: 10px;
    }
  }
}

</style>