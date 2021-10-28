<template>
  <div> 
    <Navbar></Navbar>
    <v-parallax src="../assets/home_wallpaper.jpg"></v-parallax>
    <v-card  rounded="xl" elevation="12" class="mx-auto my-12"  max-width="400">
      <v-card-title class="justify-center c-text"><h3> Descuento de <span>Facturas</span></h3></v-card-title>
      <v-card-text><v-img class="fact" src="../assets/facturas.png" max-width="150"></v-img></v-card-text>
      <v-card-actions class="justify-center c-text">
        <v-btn color="primary" rounded class="btn">Continuar</v-btn> 
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

  export default {
    name: 'Home',

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

.btn{
  width:40%;
}

.bg{
  background-color: #f5f5f5;
}
</style>
