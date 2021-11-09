<template>
  <v-app>
    
    <v-row align="center">
      
      <v-col cols="8">
        
        <v-img class="iniciofoto" src="../assets/img_login.jpg" height="100%" ></v-img>
      </v-col>
      <v-col>
        <v-card class="justify-center text-center card-login" rounded="xl" elevation="12">
          <v-card-title class="justify-center text-center"> 
            <h1 class="display-2">DISWALLET</h1>
          </v-card-title>
          <v-card-text>
            <v-form class="mt-12 field-login" @submit.prevent="login">
              <v-text-field v-model="email" filled rounded dense label="Email" name="Email" type="text" color="primary accent-3"/>
              <v-text-field v-model="contraseña" filled rounded dense id="password" label="Password" name="password" type="password" color="primary accent-3"/>
              <div class="text-center mt-2">
                <v-alert  v-if="error" color="red" type="error" >
                    {{error}}
                </v-alert>
                <v-btn rounded x-large color="primary" type="submit">Iniciar Sesión</v-btn>
                <p class="text-center mt-6">Aún no tienes una cuenta? <router-link to="./register">regístrate ahora</router-link></p>
              </div>
            </v-form>
          </v-card-text>
        </v-card> 
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import '../firebase/init'
import firebase from 'firebase/compat/app'

export default ({
  data () {
      return {
          email: '',
          contraseña: '',
          error: ''
      }
  },
  name: 'Login',
  methods: {
    login () {
            this.error = ''
            if (this.email && this.contraseña) {
                firebase.auth().signInWithEmailAndPassword(this.email, this.contraseña)
                  .then( ()=> {
                    this.$router.push({name: 'Home'})
                  }).catch(err => {
                    this.error= err.message
                  })
            } else {
                this.error = 'Todos los campos son requeridos.'
            }
    }
  }
})
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