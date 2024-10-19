<template>
  <div class="vote-stat" :class="{'accepted' : accepted, 'refused' : !accepted}">
    <p>
      <slot/>
    </p>
  </div>
</template>

<script setup>
import {onMounted, ref, watchEffect} from "vue";

const props = defineProps({
  accepted: Boolean,
  percent: Number
})
const percent = ref(props.percent)

onMounted(() => {
  if (props.accepted)
    document.documentElement.style.setProperty('--accepted-width', `${percent.value}%`);
  if (!props.accepted)
    document.documentElement.style.setProperty('--refused-width', `${percent.value}%`);
})

watchEffect(() => {
  if (props.accepted)
    document.documentElement.style.setProperty('--accepted-width', `${props.percent}%`);
  if (!props.accepted)
    document.documentElement.style.setProperty('--refused-width', `${props.percent}%`);
});
</script>

<style lang="scss">

@import "scss/variables";

.vote-stat {
  position: relative;
  display: flex;
  justify-content: flex-end;

  p {
    font-size: 12px;
    padding-bottom: 5px;
  }
}

.vote-stat:before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: grey;
  height: 3px;
  border-radius: 10px;
}

.vote-stat.accepted:after {
  content: "";
  height: 5px;
  width: var(--accepted-width, 0px);;
  position: absolute;
  bottom: -1px;
  border-radius: 10px;
  left: 0;
  background-color: $green;
  //background-color: $hoverGreen;
}

.vote-stat.refused:after {
  content: "";
  height: 5px;
  width: var(--refused-width, 0px);;
  position: absolute;
  bottom: -1px;
  left: 0;
  border-radius: 10px;
  background-color: red;
}
</style>