<template>
  <div class="score-container">
    <div class="img-container">
      <img id="cursor-target" src="./img/ESG.svg" alt="" @load="computePos">
      <div class="cursor" :style="{ transform: 'translate(calc('+ x +'px - 50%), '+ -y +'px)' }"></div>
    </div>
    <h4>{{ percent }}</h4>
    <p>Good but can be better</p>
  </div>
</template>

<script setup>

import {computed, nextTick, onMounted, onUpdated, ref} from "vue";

const props = defineProps({
  percent: Number
})

const p = ref(props.percent)
const x = ref(0)
const y = ref(0)


const computePos = () => {
  const angle = (p.value / 100) * 180;
  const radians = (180 - angle) * (Math.PI / 180);

  const cursor = document.getElementById('cursor-target')
  x.value = (cursor.width) / 2 * Math.cos(radians);
  y.value = (cursor.height / 1) * Math.sin(radians);
}



</script>

<style lang="scss">

@import "scss/variables";

.score-container {
  width: 100%;
  //height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 12px;
  }

  .img-container {
    max-height: 110px;
    position: relative;
    height: 70%;
  }

  img {
    max-height: 110px;
    width: 100%;
    //height: 100%;
    object-fit: contain;
  }
}

.cursor {
  border-radius: 50%;
  position: absolute;
  width: 15px;
  height: 15px;
  border: 3px solid $black;
  bottom: -10%;
  left: 50%;
}
</style>