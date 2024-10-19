<template>
  <div class="loader"></div>
</template>

<script setup>

</script>

<style lang="scss">

@import "scss/variables";

.loader {
  border: 5px solid $green;
  border-top: 5px solid $darkGreen;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg)
  }
}
</style>