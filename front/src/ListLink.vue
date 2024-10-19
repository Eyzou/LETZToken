<template>
  <li>
    <RouterLink class="li-item" :to="href ? href : ''">
      <slot></slot>
    </RouterLink>
  </li>
</template>

<script setup>


const props = defineProps({
  href: String,
})

</script>

<style lang="scss">

@import "scss/variables";

.li-item {
  color: $grey;
  width: fit-content;
  position: relative;
  cursor: pointer;
}

li.active .li-item::after, .li-item:hover::after {
  opacity: 1;
}

li.active .li-item {
  font-weight: bold;
}

.li-item::after {
  content: "";
  opacity: 0;
  z-index: 100;
  background-color: $grey;
  position: absolute;
  height: 1px;
  width: 100%;
  bottom: -10px;
  left: 0;
  transition: all .2s;
}

</style>