<template>
  <div> 
    <Navbar></Navbar>
    <v-parallax >
      <v-carousel hide-delimiters>  
        <v-carousel-item
          v-for="(item,i) in items"
          :key="i"
          :src="item.src"
        ></v-carousel-item>
      </v-carousel>
    </v-parallax>
    <v-card  rounded="xl" elevation="12" class="mx-auto my-12"  max-width="400">
      <v-card-title class="justify-center c-text"><h3> Descuento de <span>Facturas</span></h3></v-card-title>
      <v-card-text><v-img class="fact" src="../assets/facturas.png" max-width="150"></v-img></v-card-text>
      <v-card-actions class="justify-center c-text">
        <router-link to="./bills"><v-btn color="primary" rounded>Continuar</v-btn></router-link>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

  export default {
    name: 'Home',
    data(){
      return{
        items: [
          {
            src: 'https://fondosmil.com/fondo/89698.jpg',
          },
          {
            src: 'https://fondosmil.com/fondo/89798.jpg',
          },
          {
            src: 'https://fondosmil.com/fondo/89813.jpg',
          },
          {
            src: 'https://www.esan.edu.pe/apuntes-empresariales/2015/08/05/Indicadores_Financieros_Considerar_Facebook/Indicadores_Financieros_Considerar_Facebook.jpg',
          },
        ],
      }
    },
    components: {
      Navbar
    },
  }
</script>

<style scoped>

.fact{
  margin:auto;
}
.c-text{
  padding:30px;
}

.bg{
  background-color: #f5f5f5;
}
</style>
