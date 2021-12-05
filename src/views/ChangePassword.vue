<template>
  <v-app>
    <Navbar></Navbar>
    <v-row align="center justify-center">
      <v-dialog v-model="dialog" width="20%">
        <v-card class="card-dialog" rounded="xl" elevation="12">
          <v-card-text>
            <span>Tu nueva contraseña ha sido guardada con éxito.</span>
          </v-card-text>
          <v-card-actions>
            <v-btn plain to="./MyAccount">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-col cols="auto">
        <v-hover v-slot="{ hover }" close-delay="120">
          <v-card
            class="register-card"
            rounded="xl"
            :elevation="hover ? 16 : 6"
            :class="{ 'on-hover': hover }"
          >
            <v-card-title class="justify-center">
              <h2><span>Cambiar Contraseña</span></h2>
            </v-card-title>

            <v-card-text>
              <v-alert v-if="error" color="red" type="error">
                {{ error }}
              </v-alert>
              <v-form class="mt-6" @submit.prevent="changePassword">
                <v-container class="inputname">
                  <v-subheader>Nueva contraseña</v-subheader>
                  <v-text-field
                    v-model="newpassword"
                    filled
                    rounded
                    placeholder="**********"
                    type="password"
                    color="primary accent-3"
                  />
                  <v-subheader>Confirmar contraseña</v-subheader>
                  <v-text-field
                    v-model="confirmpassword"
                    filled
                    rounded
                    placeholder="**********"
                    type="password"
                    color="primary accent-3"
                  />

                  <div class="text-center mt-12">
                    <v-btn rounded x-large color="primary" type="submit"
                      >Guardar Cambios</v-btn
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
import Navbar from '../components/Navbar.vue';
import '../firebase/init';
import firebase from 'firebase/compat/app';

let db = firebase.database();
let usersRef = db.ref('users');
export default {
  name: 'ChangePassword',
  firebase: {
    users: usersRef,
  },
  data() {
    return {
      error: '',
      user: null,
      ruc: '',
      celular: '',
      newpassword: '',
      confirmpassword: '',
      dialog: false,
    };
  },
  components: {
    Navbar,
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        usersRef.get().then((snapshot) => {
          snapshot.forEach((doc) => {
            const userx = doc.val();
            if (userx.email == this.user.email) {
              this.celular = userx.celular;
              this.ruc = userx.ruc;
              console.log('te encontré!');
            }
          });
        });
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    changePassword() {
      this.error = '';
      if (this.newpassword && this.confirmpassword) {
        if (this.newpassword == this.confirmpassword) {
          let user = firebase.auth().currentUser;
          user
            .updatePassword(this.newpassword)
            .then(() => {
              this.dialog = true;
            })
            .catch(() => {
              this.error = 'Ingrese una contraseña más segura';
              console.log('no se pudo :C');
            });
          console.log(this.newpassword);
        } else {
          this.error = 'Ambas contraseñas deben coincidir.';
        }
      } else {
        this.error = 'Todos los campos son requeridos.';
      }
    },
  },
};
</script>

<style scoped>
.register-card {
  margin: auto;
  margin-top: 80px;
  width: 100vh;
  text-align: center;
  padding: 5%;
}
.inputname {
  width: 50%;
}

.card-dialog {
  margin: auto;
  text-align: start;
  padding: 5%;
}

.icon-edit {
  position: absolute;
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
