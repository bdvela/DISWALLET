<template>
  <div>
    <Navbar></Navbar>
    <v-card class="cardhero">
      <v-parallax class="ra">
        <div class="parallax-car">
          <v-card-title>
            <h1>
              <span class="header-title">Bienvenido a Diswallet</span>
            </h1>
          </v-card-title>
          <v-card-subtitle>
            <br />
            <h1>Tu aliado en finanzas</h1>
          </v-card-subtitle>
        </div>
      </v-parallax>
    </v-card>
    <v-container>
      <v-row>
        <v-col cols="12" sm="4">
          <v-hover v-slot="{ hover }" close-delay="120">
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              rounded="xl"
              class="mx-auto my-6"
              max-width="400"
            >
              <v-card-title class="justify-center c-text"
                ><h3>Descuento de <span>Facturas</span></h3></v-card-title
              >
              <v-card-text
                ><v-img
                  class="fact"
                  src="../assets/facturas.png"
                  max-width="150"
                ></v-img
              ></v-card-text>
              <v-card-actions class="justify-center c-text">
                <router-link to="./bills"
                  ><v-btn color="primary" rounded>Continuar</v-btn></router-link
                >
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-col>

        <v-col cols="12" sm="4">
          <v-hover v-slot="{ hover }" close-delay="120">
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              disabled
              rounded="xl"
              class="mx-auto my-6"
              max-width="400"
            >
              <v-card-title class="justify-center c-text"
                ><h3>Descuento de <span>Letras</span></h3></v-card-title
              >
              <v-card-text
                ><v-img
                  class="fact"
                  src="../assets/letras.png"
                  max-width="150"
                ></v-img
              ></v-card-text>
              <v-card-actions class="justify-center c-text">
                <router-link to="./letters"
                  ><v-btn color="primary" rounded>Continuar</v-btn></router-link
                >
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-col>

        <v-col cols="12" sm="4">
          <v-hover v-slot="{ hover }" close-delay="120">
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              disabled
              rounded="xl"
              class="mx-auto my-6"
              max-width="400"
            >
              <v-card-title class="justify-center c-text"
                ><h3>Descuento de <span>Recibos</span></h3></v-card-title
              >
              <v-card-text
                ><v-img
                  class="fact"
                  src="../assets/recibos.png"
                  max-width="150"
                ></v-img
              ></v-card-text>
              <v-card-actions class="justify-center c-text">
                <router-link to="./receipts"
                  ><v-btn color="primary" rounded>Continuar</v-btn></router-link
                >
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';

export default {
  name: 'Home',
  data() {
    return {};
  },
  components: {
    Navbar,
  },
};
</script>

<style scoped>
.header-title {
  color: white;
  font-size: 58px;
}
.cardhero {
  margin-top: 50px;
}

.parallax-car {
  background-image: linear-gradient(
    rgba(0, 0, 0, 0.658),
    rgba(138, 86, 235, 0.171)
  );
  width: 100%;
  height: 100%;
  opacity: 0.7;
  position: absolute;
  padding-top: 60px;
  padding-left: 60px;
  left: 0%;
}

.fact {
  margin: auto;
}
.c-text {
  padding: 30px;
}

.ra {
  background: rgb(98, 45, 195);
  background: linear-gradient(
    90deg,
    rgba(98, 45, 195, 1) 0%,
    rgba(113, 70, 237, 1) 50%,
    rgba(98, 45, 195, 1) 100%
  );
  background-image: url('https://fondosmil.com/fondo/89698.jpg');
  background-size: cover;
  background-position-y: 50%;
}
.bg {
  background-color: #f5f5f5;
}
</style>
