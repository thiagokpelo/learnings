<template lang="html">
    <div class="corpo">

      <meu-menu :rotas="routes"></meu-menu>

      <transition name="pagina">
        <router-view></router-view>
      </transition>
    </div>
</template>

<script>
import { routes } from './routes';
import Menu from './components/shared/menu/Menu.vue';

export default{

    components: {
      'meu-menu': Menu
    },

    data() {

        return {
            routes : routes.filter(route => route.menu)
        }
    }
}
</script>

<style lang="css">
  .corpo{
    font-family: Helvetica, sans-serif;
    margin: 0 auto;
    width: 96%;
  }

  .pagina-enter, .pagina-leave-active {
    opacity: 0;
  }

  .pagina-enter-active, .pagina-leave-active {
    transition: opacity 0.5s;
  }
</style>
