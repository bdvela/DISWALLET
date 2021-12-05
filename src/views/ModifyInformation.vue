<template>
  <v-app>
    <Navbar></Navbar>
    <v-row align="center justify-center">
      <v-col cols="auto">
        <v-hover v-slot="{ hover }" close-delay="120">
          <v-card
            class="register-card"
            rounded="xl"
            :elevation="hover ? 16 : 6"
            :class="{ 'on-hover': hover }"
          >
            <v-card-title class="justify-center">
              <v-avatar color="primary" size="180">
                <v-icon color="#ffff" size="200">mdi-account-circle</v-icon>
              </v-avatar>
            </v-card-title>
            <v-card-subtitle>
              <br />
              <p class="text-h4">Mi nombre</p>
            </v-card-subtitle>
            <v-card-text>
              <v-form class="mt-6" @submit.prevent="editUser">
                <v-container class="inputname">
                  <v-subheader>Nombre</v-subheader>
                  <v-text-field
                    v-model="userEdited.nombres"
                    filled
                    rounded
                    :placeholder="user.displayName"
                    type="text"
                    color="primary accent-3"
                  />

                  <div class="text-center mt-12">
                    <v-btn rounded x-large color="primary" type="submit"
                      >Guardar cambios</v-btn
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
  name: 'ModifyInformation',
  firebase: {
    users: usersRef,
  },
  data() {
    return {
      error: '',
      user: null,
      ruc: '',
      celular: '',
      userEdited: {
        ruc: '',
        nombres: '',
        email: '',
        celular: '',
      },
      oldruc: 0,
      oldnombres: '',
      oldemail: '',
      oldcelular: '',
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
    editUser() {
      let user = firebase.auth().currentUser;
      if (this.userEdited.nombres == '') {
        this.userEdited.nombres = this.oldnombres;
      }
      if (this.userEdited.email == '') {
        this.userEdited.email = this.oldemail;
      }
      user.updateProfile({
        displayName: this.userEdited.nombres,
      });
      this.$router.push({ name: 'MyAccount' });
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

.col-register {
  padding-block: 0px;
}
.inputname {
  width: 50%;
}

.inputPrice input[type='number'] {
  -moz-appearance: textfield;
}
.inputPrice input::-webkit-outer-spin-button,
.inputPrice input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
