<template>
  <div class="corpo">
    <h1 class="centralizado">{{ titulo }}</h1>
    <h2 class="centralizado" v-text="subtitulo"></h2>

    <p class="centralizado" v-show="mensagem">{{ mensagem }}</p>

    <input type="search" class="filtro" v-on:input="filtro = $event.target.value" placeholder="Filtre pelo título">

    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto in fotosComFiltro">

        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva v-meu-transform.animate="45" :url="foto.url" :titulo="foto.titulo"/>
          <router-link :to="{name : 'altera', params: { id: foto._id } }">
            <meu-botao rotulo="Alterar" tipo="button"/>
          </router-link>
          <meu-botao estilo="perigo" rotulo="Remover" tipo="button" @click.native="remove(foto)"/>
        </meu-painel>

      </li>
    </ul>
  </div>
</template>

<script>
import Painel from '../shared/painel/Painel.vue';
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';
import Botao from '../shared/botao/Botao.vue';
import transform from '../../directives/Transform';
import FotoService from '../../domain/foto/FotoService';

export default {

    components: {
      'meu-painel': Painel,
      'imagem-responsiva': ImagemResponsiva,
      'meu-botao': Botao
    },

    directives: {
      'meu-transform': transform
    },

    data () {
        return {
            titulo: 'Alurapic',
            subtitulo: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            fotos: [],
            filtro: '',
            mensagem: ''
        }
    },

    computed: {
        fotosComFiltro () {
            if(this.filtro) {
                let exp = new RegExp(this.filtro.trim(), 'i');
                return this.fotos.filter(item => exp.test(item.titulo));
            }

            return this.fotos;
        }
    },

    created () {

      this.service = new FotoService(this.$resource);

      this.service
        .lista()
        .then(fotos => this.fotos = fotos, err => this.mensagem = err.message);

      // this.resource
      //   .query()
      //   .then(res => res.json())
      //   .then(fotos => this.fotos = fotos, err => console.log(err));
        

      // this.$http.get('v1/fotos')
      //   .then(res => res.json())
      //   .then(fotos => this.fotos = fotos, err => console.log(err));
    },

    methods: {
        remove (foto) {
            if(confirm('Confirma?')) {

              this.service
                .apaga(foto._id)
                .then(() => {
                  let index = this.fotos.indexOf(foto);
                  this.fotos.splice(index, 1);
                  this.mensagem = 'Foto removida com sucesso'
                
                }, (err) => this.mensagem = err.message);

              // this.resource
              //   .delete({ id: foto._id })
              //   .then(() => {
              //     let index = this.fotos.indexOf(foto);
              //     this.fotos.splice(index, 1);
              //     this.mensagem = 'Foto removida com sucesso'
                
              //   }, (err) => {
              //     console.log(err)
              //     this.mensagem = 'Não foi possível remover a foto';
              //   });
                
            }
        }
    }
}
</script>

<style scoped>
.centralizado {
  text-align: center;
}

.lista-fotos {
  list-style: none;
}

.lista-fotos-item {
  display: inline-block;
}

.imagem-responsiva {
  width: 100%;
  height: auto;
}

.filtro {
  display: block;
  width: 100%;
}
</style>
