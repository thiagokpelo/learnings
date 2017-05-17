<template lang="html">
  <nav>
    <ul>
      <li v-for="rota in rotas">
        <router-link :to="rota.path ? rota.path : '/'">{{ rota.titulo }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
    props: {
        rotas: {
          type: Array,
          required: true
        }
    }
}
</script>

<style lang="css" scoped>
  nav { width: 100%; background-color: #eee; }

  ul {
    list-style: none;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }
</style>
