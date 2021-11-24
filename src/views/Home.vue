<template>
  <div>
    <Navbar></Navbar>
    <v-card rounded="lg">
      <v-parallax src="https://fondosmil.com/fondo/89698.jpg">
        <div class="parallax-car">
          <v-card-title>
            <h1>
              <span class="header-title">Bienvenido a Diswallet</span> <br />
              <br />
              Tu aliado en las finanzas.
            </h1>
          </v-card-title>
        </div>
      </v-parallax>
    </v-card>
    <v-container>
      <v-row>
        <v-col md="4">
          <v-card
            rounded="xl"
            elevation="12"
            class="mx-auto my-12"
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
        </v-col>

        <v-col md="4">
          <v-card
            disabled
            rounded="xl"
            elevation="12"
            class="mx-auto my-12"
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
        </v-col>

        <v-col md="4">
          <v-card
            disabled
            rounded="xl"
            elevation="12"
            class="mx-auto my-12"
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
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";

export default {
  name: "Home",
  data() {
    return {
      items: [
        {
          src: "https://fondosmil.com/fondo/89698.jpg",
        },
        {
          src: "https://fondosmil.com/fondo/89798.jpg",
        },
        {
          src: "https://fondosmil.com/fondo/89813.jpg",
        },
        {
          src: "https://www.esan.edu.pe/apuntes-empresariales/2015/08/05/Indicadores_Financieros_Considerar_Facebook/Indicadores_Financieros_Considerar_Facebook.jpg",
        },
      ],
    };
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

.parallax-car {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
  width: 100%;
  height: 100%;
  opacity: 0.7;
  position: absolute;
  font-size: 40px;
  z-index: 10;
  padding-top: 60px;
  padding-left: 60px;
  align-content: flex-start;
  color: white;
  left: 0%;
}

.fact {
  margin: auto;
}
.c-text {
  padding: 30px;
}

.bg {
  background-color: #f5f5f5;
}
</style>
