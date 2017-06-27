<template lang="html">
  <button :type="tipo" class="botao" v-bind:class="botaoClass" >{{ rotulo }}</button>
</template>

<script>
export default {

    props: ['tipo', 'rotulo', 'estilo'],

    computed: {

      botaoClass: function () {
        if (this.estilo == 'perigo') return 'botao-perigo';
        
        return 'botao-padrao';
      }
    }
}
</script>

<style lang="scss" scoped>
  @import './Botao';
</style>
