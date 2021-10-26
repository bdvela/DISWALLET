<template>
    <v-card class="mx-auto overflow-hidden" >
      <v-app-bar app light fixed>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title><span>Diswallet</span></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-list-item>Hola {{usuario}}!</v-list-item>
          <v-list-item>
             <router-link to='./myaccount'>
            <v-avatar color="primary">
              <v-icon dark>mdi-account</v-icon>
            </v-avatar>
             </router-link>
          </v-list-item>
        </v-toolbar-items>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" temporary>
      <v-list nav dense>
            <v-list-item>
              <v-layout column align-start>
                Menu
              </v-layout>
            <v-layout column align-end>
              <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            </v-layout>
            </v-list-item>
            <br>
             <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
          <router-link to='./home'>
          <v-list-item>
            <v-list-item-title>Inicio</v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
          </v-list-item>
          </router-link>

          <router-link to='./bills'>
          <v-list-item>
            <v-list-item-title>Descuento de Facturas</v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-currency-usd</v-icon>
            </v-list-item-icon>
          </v-list-item>
          </router-link>

          <router-link to='./myaccount'>
          <v-list-item>
            <v-list-item-title>Mi Cuenta</v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
          </v-list-item>
          </router-link>
          
          <router-link to='./login'>
          <v-list-item>
            <v-list-item-title>Cerrar Sesión</v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
          </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    </v-card>
</template>

<script>
export default {
  name: 'Navbar',
  data: () => ({
    drawer: false,
    group: null,
    usuario: 'Peter'
  }),

};
</script>

<style scoped>

a {  
  text-decoration: none;
}

</style>
