<template>
  <v-app>
    <v-row align="center justify-center">
      <v-col cols="auto">
        <v-row class="text-center justify-center mb-2">
          <v-alert v-if="error" color="red" type="error" width="35%">
            {{ error }}
          </v-alert>
        </v-row>
        <v-hover v-slot="{ hover }" close-delay="120">
          <v-card
            class="register-card"
            rounded="xl"
            :elevation="hover ? 16 : 6"
            :class="{ 'on-hover': hover }"
          >
            <v-card-title class="justify-center">
              <h1>REGISTRO</h1>
            </v-card-title>
            <v-card-text>
              <v-form class="mt-6" @submit.prevent="register">
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" class="col-register">
                      <v-subheader>RUC</v-subheader>
                      <v-text-field
                        v-model="newUser.ruc"
                        filled
                        rounded
                        autofocus
                        placeholder="RUC"
                        type="number"
                        color="primary accent-3"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" class="col-register">
                      <v-subheader>Nombre</v-subheader>
                      <v-text-field
                        v-model="newUser.nombres"
                        filled
                        rounded
                        placeholder="nombre"
                        type="text"
                        color="primary accent-3"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" class="col-register">
                      <v-subheader>Email</v-subheader>
                      <v-text-field
                        v-model="newUser.email"
                        filled
                        rounded
                        placeholder="email"
                        type="email"
                        color="primary accent-3"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" class="col-register">
                      <v-subheader>Celular</v-subheader>
                      <v-text-field
                        v-model="newUser.celular"
                        filled
                        rounded
                        placeholder="celular"
                        type="number"
                        color="primary accent-3"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" class="col-register">
                      <v-subheader>Contraseña</v-subheader>
                      <v-text-field
                        v-model="newUser.contraseña"
                        filled
                        rounded
                        id="password1"
                        placeholder="**********"
                        name="password1"
                        type="password"
                        color="primary accent-3"
                      />
                    </v-col>
                  </v-row>
                  <div class="text-center mt-2">
                    <v-btn rounded x-large color="primary" type="submit"
                      >Registrarme</v-btn
                    >
                  </div>
                </v-container>
              </v-form>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import '../firebase/init';
import firebase from 'firebase/compat/app';

let db = firebase.database();
let usersRef = db.ref('users');

export default {
  name: 'Register',
  firebase: {
    users: usersRef,
  },
  data() {
    return {
      newUser: {
        ruc: '',
        nombres: '',
        email: '',
        celular: '',
        contraseña: '',
      },
      error: '',
    };
  },
  methods: {
    register() {
      this.error = '';
      if (
        this.newUser.ruc &&
        this.newUser.nombres &&
        this.newUser.email &&
        this.newUser.celular &&
        this.newUser.contraseña
      ) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(
            this.newUser.email,
            this.newUser.contraseña
          )
          .then((user) => {
            //Actualizar usuario
            if (user) {
              user.user
                .updateProfile({
                  displayName: this.newUser.nombres,
                  email: this.newUser.email,
                })
                .then(() => {
                  usersRef.push(this.newUser);
                  this.newUser.ruc = '';
                  this.newUser.nombres = '';
                  this.newUser.email = '';
                  this.newUser.celular = '';
                  this.newUser.contraseña = '';
                  this.$router.push({ name: 'SuccessRegister' });
                })
                .catch((err) => {
                  this.error = err.message;
                });
            }
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
.register-card {
  width: 100vh;
  text-align: center;
  padding: 10%;
}

.col-register {
  padding-block: 0px;
}

.inputPrice input[type='number'] {
  -moz-appearance: textfield;
}
.inputPrice input::-webkit-outer-spin-button,
.inputPrice input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
