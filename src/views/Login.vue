<template>
  <v-app>
    <v-row align="center">
      <v-col cols="8">
        <v-img class="iniciofoto" src="../assets/img_login.jpg" height="100%" ></v-img>
      </v-col>
      <v-col>
        <v-card class="justify-center text-center card-login rounded-card" rounded="xl" elevation="12">
          <v-card-title class="justify-center text-center"> 
            <h1 class="display-2">DISWALLET</h1>
          </v-card-title>
          <v-card-content>
            <v-form class="mt-12 field-login">
              <v-text-field filled rounded dense label="Email" name="Email" type="text" color="primary accent-3"/>
              <v-text-field filled rounded dense id="password" label="Password" name="password" type="password" color="primary accent-3"/>
            </v-form>
          </v-card-content>
          <v-card-actions class="justify-center text-center">
          <div class="text-center mt-2">
            <router-link to="./home"><v-btn rounded x-large color="primary">Iniciar Sesión</v-btn></router-link>
            <p class="text-center mt-6">Aún no tienes una cuenta? <router-link to="./Register.vue">regístrate ahora</router-link></p>
          </div>
          </v-card-actions>
        </v-card> 
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  name: 'Login',

}
</script>

<style scoped>

.iniciofoto{
  position:fixed;
  left: 0px;
  top: 0px;
}

.card-login{
  text-align: center;
  padding: 10%;
}

</style>