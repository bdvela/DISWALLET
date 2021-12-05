<template>
  <v-app>
    <v-row align="center" no-gutters>
      <v-col cols="12" sm="6" md="8">
        <v-img
          class="iniciofoto"
          src="../assets/img_login.jpg"
          height="100%"
        ></v-img>
      </v-col>
      <v-col cols="12" md="4">
        <v-hover v-slot="{ hover }" close-delay="120">
          <v-card
            class="justify-center text-center card-login"
            rounded="xl"
            :elevation="hover ? 16 : 6"
            :class="{ 'on-hover': hover }"
          >
            <v-card-title class="justify-center text-center">
              <h1 class="display-2">DISWALLET</h1>
            </v-card-title>
            <v-card-subtitle>
              <span>Tu aliado en las finanzas</span>
            </v-card-subtitle>

            <v-card-text>
              <v-form class="mt-6 field-login" @submit.prevent="login">
                <v-alert v-if="error" color="red" type="error">
                  {{ error }}
                </v-alert>
                <v-text-field
                  v-model="email"
                  rounded
                  filled
                  autofocus
                  label="Email"
                  type="text"
                  color="primary accent-3"
                />
                <v-text-field
                  v-model="contraseña"
                  rounded
                  filled
                  label="Password"
                  type="password"
                  color="primary accent-3"
                />
                <div class="text-center mt-2">
                  <v-btn
                    rounded
                    elevation=""
                    large
                    color="primary"
                    type="submit"
                    >Iniciar Sesión</v-btn
                  >
                  <p class="text-center mt-6">
                    Aún no tienes una cuenta?
                    <router-link to="./register">regístrate ahora</router-link>
                  </p>
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <p class="copy">
      <a href="https://github.com/bdvela">a project by bdvela</a>
    </p>
  </v-app>
</template>

<script>
import '../firebase/init';
import firebase from 'firebase/compat/app';

export default {
  data() {
    return {
      email: '',
      contraseña: '',
      error: '',
    };
  },
  name: 'Login',
  methods: {
    login() {
      this.error = '';
      if (this.email && this.contraseña) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.contraseña)
          .then(() => {
            this.$router.push({ name: 'Home' });
          })
          .catch((err) => {
            this.error = err.message;
          });
      } else {
        this.error = 'Todos los campos son requeridos.';
      }
    },
  },
};
</script>

<style scoped>
* {
  text-decoration: none;
}
.iniciofoto {
  position: fixed;
  left: 0px;
  top: 0px;
}
.copy {
  color: black;
  text-align: end;
  align-items: flex-end;
}
.prueba {
  background-color: red;
}

.card-login {
  margin: 50px;
  text-align: center;
  padding: 10%;
}
</style>
