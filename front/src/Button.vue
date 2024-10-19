<template>
  <a class="btn" :href="href">{{content}}</a>
</template>

<script setup>

const props = defineProps({
  content: String,
  href: String,
})




</script>

<style lang="scss">

  @import "./scss/_base.scss";

  a{
    font-size: 16px;
    transition: all 0.2s;
    width: fit-content;
  }

  a.btn:hover{
    background-color: $hoverGreen;
    color: black;
  }

  .btn{
    padding: 16px 32px;
    background-color: $green;
  }

</style>