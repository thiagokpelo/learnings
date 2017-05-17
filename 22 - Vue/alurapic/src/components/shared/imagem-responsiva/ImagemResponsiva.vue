<template>
  <img :src="url" v-bind:alt="titulo">
</template>

<script>
export default {

  props: ['url', 'titulo']
}
</script>

<style scoped>
img {
  width: 100%;
  height: auto;
}
</style>
