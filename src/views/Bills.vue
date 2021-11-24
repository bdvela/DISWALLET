<template>
  <div>
    <Navbar></Navbar>
    <v-card class="bills-card" elevation="4" rounded="xl">
      <v-card-title>
        <h2>Mis Facturas</h2>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>

        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>

        <!--DIALOG ADD BILLS-->
        <v-row justify="center">
          <!--CUADRO DE DIALOGO NUEVA FACTURA-->
          <v-dialog v-model="dialog" max-width="100vh">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" fab v-bind="attrs" v-on="on">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>

            <v-card class="card-dialog" rounded="xl" elevation="12">
              <v-card-title class="justify-center">
                <span class="text-h3 formtitle">NUEVA FACTURA</span>
              </v-card-title>
              <v-alert v-if="error" color="red" type="error">
                {{ error }}
              </v-alert>
              <div class="switch-toggle">
                <v-subheader class="PEN">PEN</v-subheader>
                <v-switch
                  v-model="kindOfMoney"
                  label="USD"
                  class="mt-2"
                ></v-switch>
              </div>
              <v-card-text>
                <v-form class="mt-12" @submit.prevent="addBill">
                  <v-container class="container-forms">
                    <v-row>
                      <v-col class="col-register" cols="12" sm="6">
                        <v-subheader>RUC</v-subheader>
                        <v-text-field
                          v-model="newBill.ruc"
                          placeholder="RUC"
                          autofocus
                          filled
                          rounded
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col class="col-register" cols="12" sm="6">
                        <v-subheader>Razón Social</v-subheader>
                        <v-text-field
                          v-model="newBill.empresa"
                          placeholder="razón social"
                          filled
                          rounded
                        ></v-text-field>
                      </v-col>
                      <v-col class="col-register" cols="12" sm="6">
                        <v-subheader>Fecha de emisión</v-subheader>
                        <v-text-field
                          v-model="newBill.emision"
                          placeholder="dd/mm/aaaa"
                          type="date"
                          filled
                          rounded
                        ></v-text-field>
                      </v-col>

                      <v-col class="col-register" cols="12" sm="6">
                        <v-subheader>Fecha de pago</v-subheader>
                        <v-text-field
                          v-model="newBill.fechapago"
                          placeholder="dd/mm/aaaa"
                          type="date"
                          filled
                          rounded
                        ></v-text-field>
                      </v-col>
                      <v-col class="col-register" cols="12" sm="6">
                        <v-subheader>Monto Total</v-subheader>
                        <v-text-field
                          v-model="newBill.monto"
                          placeholder="0.00"
                          type="number"
                          filled
                          rounded
                        ></v-text-field>
                      </v-col>
                      <v-col class="col-register" cols="12" sm="6">
                        <v-subheader>Retención</v-subheader>
                        <v-text-field
                          v-model="newBill.retencion"
                          placeholder="0.00"
                          type="number"
                          filled
                          rounded
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <div class="text-center mt-12">
                      <v-btn color="primary" rounded x-large type="submit"
                        >Registrar Factura</v-btn
                      >
                    </div>
                  </v-container>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialog3" max-width="100vh">
            <template v-slot:activator="{ on, attrs }">
              <div color="primary" fab v-bind="attrs" v-on="on" disabled></div>
            </template>
            <v-card class="results-dialog" rounded="xl" elevation="12">
              <v-card-title class="justify-center">
                <span class="display-3">RESULTADOS</span>
              </v-card-title>
              <v-card-text class="justify-center">
                <table cellspacing="15">
                  <tbody>
                    <br />
                    <tr style="height: 23px">
                      <td style="height: 23px">
                        Tasa Efectiva anual (Sin Costes):
                      </td>
                      <td class="resultado">
                        <b> {{ newtcea.tea }}% </b>
                      </td>
                      <td style="height: 23px">Costes Iniciales Totales:</td>
                      <td class="resultado">
                        <b>{{ newtcea.ci }}</b>
                      </td>
                    </tr>
                    <tr style="height: 23px">
                      <td style="height: 23px">
                        Número de días transcurridos:
                      </td>
                      <td class="resultado">
                        <b>{{ newtcea.nd }}</b>
                      </td>
                      <td style="height: 23px">Valor Neto:</td>
                      <td class="resultado">
                        <b>{{ newtcea.vnet }}</b>
                      </td>
                    </tr>
                    <tr style="height: 23px">
                      <td style="height: 23px">
                        Tasa Efectiva a {{ newtcea.nd }} días:
                      </td>
                      <td class="resultado">
                        <b>{{ newtcea.te }}%</b>
                      </td>
                      <td style="height: 23px">Valor Total a Recibir:</td>
                      <td class="resultado">
                        <b>{{ newtcea.vr }}</b>
                      </td>
                    </tr>
                    <tr style="height: 23px">
                      <td style="height: 23px">
                        Tasa Descontada a {{ newtcea.nd }} días:
                      </td>
                      <td class="resultado">
                        <b>{{ newtcea.d }}%</b>
                      </td>
                      <td style="height: 23px">Costes Finales Totales:</td>
                      <td class="resultado">
                        <b>{{ newtcea.cf }}</b>
                      </td>
                    </tr>
                    <tr style="height: 23px">
                      <td style="height: 23px">Descuento por días:</td>
                      <td class="resultado">
                        <b>{{ newtcea._d }}</b>
                      </td>
                      <td style="height: 23px">Valor Total a Entregar:</td>
                      <td class="resultado">
                        <b>{{ newtcea.ve }}</b>
                      </td>
                    </tr>
                    <tr style="height: 23px">
                      <td style="height: 23px">Retención:</td>
                      <td class="resultado">
                        <b>{{ newtcea.retencion }}</b>
                      </td>
                      <td style="height: 23px">
                        <b>Tasa de Coste Efectivo Anual (TCEA): </b>
                      </td>
                      <td class="resultado">
                        <b>{{ newtcea.tcea }}%</b>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn
                  large
                  rounded
                  color="primary"
                  width="150px"
                  @click="closeresults()"
                >
                  Confirmar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialog4" max-width="100vh">
            <template v-slot:activator="{ on, attrs }">
              <div color="primary" fab v-bind="attrs" v-on="on" disabled></div>
            </template>
            <v-card class="results-dialog" rounded="xl" elevation="12">
              <v-card-title class="justify-center">
                <span class="display-3">RESULTADOS</span>
              </v-card-title>
              <v-card-text class="justify-center">
                <table cellspacing="15">
                  <tbody>
                    <br />
                    <tr style="height: 23px">
                      <td style="height: 23px">
                        Tasa Efectiva anual (Sin Costes):
                      </td>
                      <td class="resultado">
                        <b> {{ newtcea.tea }}% </b>
                      </td>

                      <td style="height: 23px">Costes Iniciales Totales:</td>
                      <td class="resultado">
                        <b>{{ newtcea.ci }}</b>
                      </td>
                    </tr>
                    <tr style="height: 23px">
                      <td style="height: 23px">
                        Número de días transcurridos:
                      </td>
                      <td class="resultado">
                        <b>{{ newtcea.nd }}</b>
                      </td>
                      <td style="height: 23px">Valor Neto:</td>
                      <td class="resultado">
                        <b>{{ newtcea.vnet }}</b>
                      </td>
                    </tr>
                    <tr style="height: 23px">
                      <td style="height: 23px">
                        Tasa Efectiva a {{ newtcea.nd }} días:
                      </td>
                      <td class="resultado">
                        <b>{{ newtcea.te }}%</b>
                      </td>
                      <td style="height: 23px">Valor Total a Recibir:</td>
                      <td class="resultado">
                        <b>{{ newtcea.vr }}</b>
                      </td>
                    </tr>
                    <tr style="height: 23px">
                      <td style="height: 23px">
                        Tasa Descontada a {{ newtcea.nd }} días:
                      </td>
                      <td class="resultado">
                        <b>{{ newtcea.d }}%</b>
                      </td>
                      <td style="height: 23px">Costes Finales Totales:</td>
                      <td class="resultado">
                        <b>{{ newtcea.cf }}</b>
                      </td>
                    </tr>
                    <tr style="height: 23px">
                      <td style="height: 23px">Descuento por días:</td>
                      <td class="resultado">
                        <b>{{ newtcea._d }}</b>
                      </td>
                      <td style="height: 23px">Valor Total a Entregar:</td>
                      <td class="resultado">
                        <b>{{ newtcea.ve }}</b>
                      </td>
                    </tr>
                    <tr style="height: 23px">
                      <td style="height: 23px">Retención:</td>
                      <td class="resultado">
                        <b>{{ newtcea.retencion }}</b>
                      </td>
                      <td style="height: 23px">
                        <b>Tasa de Coste Efectivo Anual (TCEA): </b>
                      </td>
                      <td class="resultado">
                        <b>{{ newtcea.tcea }}%</b>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </v-card-text>
            </v-card>
          </v-dialog>

          <!--CUADRO DE DIALOGO CALCULTO TCEA-->
          <v-dialog v-model="dialog2" max-width="100vh">
            <template v-slot:activator="{ on, attrs }">
              <div color="primary" fab v-bind="attrs" v-on="on" disabled></div>
            </template>

            <v-card class="tcea-dialog" rounded="xl" elevation="12">
              <v-card-title class="justify-center">
                <span class="text-h3">CALCULAR TCEA</span>
              </v-card-title>
              <v-alert v-if="error" color="red" type="error">
                {{ error }}
              </v-alert>
              <v-card-text>
                <v-form class="mt-12" @submit.prevent="showTCEA">
                  <v-container class="container-forms">
                    <v-row>
                      <v-col class="col-register" cols="12" sm="4">
                        <h3>Tasa y plazo</h3>
                        <v-subheader>Días por año</v-subheader>
                        <v-select
                          :items="days"
                          v-model="newtcea.dias"
                          placeholder="días por año"
                          autofocus
                          filled
                          rounded
                          required
                        ></v-select>
                      </v-col>

                      <v-col class="col-register" cols="12" sm="4">
                        <h3>Costes / Gastos</h3>
                        <v-subheader>Gastos iniciales </v-subheader>
                        <v-select
                          :items="gastos"
                          v-model="newtcea.gastosIniciales"
                          placeholder="motivo"
                          filled
                          rounded
                        ></v-select>
                      </v-col>

                      <v-col class="col-register" cols="12" sm="4">
                        <h3>Datos de la factura</h3>
                        <v-subheader>Fecha de emisión</v-subheader>
                        <v-text-field
                          v-model="newtcea.emision"
                          outlined
                          disabled
                          filled
                          type="date"
                          rounded
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col class="col-register" cols="12" sm="4">
                        <v-subheader>Plazo de tasa</v-subheader>
                        <v-select
                          :items="plazo"
                          v-model="newtcea.plazo"
                          placeholder="plazo de tasa"
                          filled
                          rounded
                          required
                        ></v-select>
                      </v-col>

                      <v-col class="col-register" cols="12" sm="4">
                        <v-subheader>Valor total en efectivo</v-subheader>
                        <v-text-field
                          v-model="newtcea.valorEfectivoGI"
                          placeholder="gastos iniciales"
                          type="number"
                          filled
                          rounded
                        ></v-text-field>
                      </v-col>

                      <v-col class="col-register" cols="12" sm="4">
                        <v-subheader>Fecha de pago</v-subheader>
                        <v-text-field
                          v-model="newtcea.fechapago"
                          outlined
                          disabled
                          filled
                          type="date"
                          rounded
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col class="col-register" cols="12" sm="4">
                        <v-subheader>Tasa</v-subheader>
                        <v-row class="formtasa">
                          <v-col class="col-register" cols="12" sm="6"
                            ><v-radio-group v-model="newtcea.tipotasa">
                              <v-radio
                                label="Efectiva"
                                value="Efectiva"
                              ></v-radio>
                              <v-radio
                                label="Nominal"
                                value="Nominal"
                              ></v-radio>
                            </v-radio-group>
                          </v-col>
                          <v-col class="col-register" cols="12" sm="6">
                            <v-text-field
                              v-model="newtcea.tasa"
                              type="number"
                              placeholder="(%)"
                              filled
                              rounded
                            ></v-text-field>
                          </v-col>
                          <v-col>
                            <div v-if="newtcea.tipotasa == 'Nominal'">
                              <v-subheader
                                >Periodo de Capitalización</v-subheader
                              >
                              <v-select
                                :items="capitalizacion"
                                v-model="newtcea.capitalizacion"
                                placeholder="per. de capitalización"
                                filled
                                rounded
                                required
                              ></v-select>
                            </div>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col class="col-register" cols="12" sm="4">
                        <v-divider></v-divider>
                        <v-subheader>Gastos finales</v-subheader>
                        <v-select
                          :items="gastos"
                          v-model="newtcea.gastosFinales"
                          placeholder="motivo"
                          filled
                          rounded
                        ></v-select>
                      </v-col>

                      <v-col class="col-register" cols="12" sm="4">
                        <v-subheader>Total facturado</v-subheader>
                        <v-text-field
                          v-model="newtcea.monto"
                          outlined
                          disabled
                          filled
                          rounded
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col class="col-register" cols="12" sm="4">
                        <v-subheader>Fecha de descuento</v-subheader>
                        <v-text-field
                          v-model="newtcea.fechaDescuento"
                          placeholder="dd/mm/aaaa"
                          type="date"
                          filled
                          rounded
                        ></v-text-field>
                      </v-col>
                      <v-col class="col-register" cols="12" sm="4">
                        <v-subheader>Valor total en efectivo</v-subheader>
                        <v-text-field
                          v-model="newtcea.valorEfectivoGF"
                          placeholder="gastos finales"
                          type="number"
                          filled
                          rounded
                        ></v-text-field>
                      </v-col>
                      <v-col class="col-register" cols="12" sm="4">
                        <v-subheader>Retención</v-subheader>
                        <v-text-field
                          v-model="newtcea.retencion"
                          outlined
                          disabled
                          filled
                          rounded
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <div class="text-center mt-2">
                      <v-btn color="primary" rounded x-large type="submit"
                        >Calcular</v-btn
                      >
                    </div>
                  </v-container>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-row>
      </v-card-title>
      <v-divider light></v-divider>
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        hide-default-footer
        items-per-page="50"
      >
        <template slot="no-data">
          <div>No cuentas con ninguna factura. Crea una rápido y fácil.</div>
        </template>
        <template #item.tcea="{ item }">
          <div v-if="item.tcea == 0">
            <v-btn rounded small color="primary" @click.stop="getdata(item.id)"
              >Calcular</v-btn
            >
          </div>
          <div v-else>
            <a @click.stop="getresults(item.id)">{{ item.tcea }}</a>
          </div>
        </template>
      </v-data-table>
    </v-card>
    <v-card class="wallet-card" elevation="4" rounded="xl" v-if="id > 1">
      <v-card-title>
        <v-spacer></v-spacer>
        <h2>Cartera de Facturas</h2>
        <v-spacer></v-spacer>
        <v-btn fab rounded color="primary" @click="crearcartera()">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-subtitle> </v-card-subtitle>
      <v-divider light></v-divider>
      <v-card-text>
        <v-data-table
          :header="items"
          :items="walletitems"
          hide-default-header
          hide-default-footer
          items-per-page="50"
        >
          <template slot="no-data">
            <div>
              Tu cartera está vacía. Empieza a crear facturas para calcular tu
              cartera automáticamente
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import Navbar from "../components/Navbar.vue";
import moment from "moment";

let db = firebase.database();
let billsRef = db.ref("bills");
let resultsRef = db.ref("results");
let keysRef = db.ref("keysx");
export default {
  name: "Bills",
  components: {
    Navbar,
  },

  firebase: {
    bills: billsRef,
    results: resultsRef,
    keysx: keysRef,
  },
  data() {
    return {
      totalfacturado: "hola",
      search: "",
      headers: [
        {
          text: "ID",
          align: "start",
          value: "id",
        },
        { text: "Nombre de la empresa", value: "empresa" },
        { text: "Fecha de emisión", value: "emision" },
        { text: "Fecha de pago", value: "fechapago" },
        { text: "Monto", value: "monto" },
        { text: "DIVISA", value: "kindOfMoney" },
        { text: "TCEA (%)", value: "tcea", sortable: false },
      ],
      walletheader: [
        {
          text: "Info",
          align: "start",
          value: "info",
          sortable: false,
        },
        { text: "Resultado", value: "resultado", sortable: false },
      ],
      butid: 0,
      items: [],
      walletitems: [
        { info: " Valor Total a Recibir por la Cartera: ", resultado: "" },
        {
          info: "Tasa de Coste Efectiva Anual de la Cartera: ",
          resultado: "",
        },
      ],
      id: 0,
      id2: 0,
      notcea: 0,
      error: "",
      editedIndex: -1,
      dialog: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      keys: {
        id: 0,
        key: "",
      },
      newtcea: {
        billid: "",
        dias: "",
        plazo: "",
        tipotasa: "",
        tasa: "",
        fechaDescuento: "",
        gastosIniciales: "",
        valorEfectivoGI: "",
        gastosFinales: "",
        valorEfectivoGF: "",
        emision: "",
        monto: "",
        fechapago: "",
        capitalizacion: "",
        tea: "",
        nd: "",
        te: "",
        d: "",
        _d: "",
        rt: "",
        ci: "",
        vnet: "",
        vr: "",
        cf: "",
        ve: "",
        tcea: 0,
      },
      newBill: {
        userid: 0,
        id: 0,
        ruc: "",
        empresa: "",
        emision: "",
        fechapago: "",
        monto: "",
        kindOfMoney: "",
        retencion: "",
        tcea: 0,
      },
      // V-SELECT TCEA
      days: [360, 365],
      plazo: [
        "Diario",
        "Quincenal",
        "Mensual",
        "Bimestral",
        "Trimestral",
        "Cuatrimestral",
        "Semestral",
        "Anual",
      ],
      gastos: [
        "Portes",
        "Fotocopias",
        "Gastos de administración",
        "Gastos notariales",
        "Gastos registrales",
        "Seguro",
        "Otros gastos",
      ],
      capitalizacion: [
        "Diario",
        "Quincenal",
        "Mensual",
        "Bimestral",
        "Trimestral",
        "Cuatrimestral",
        "Semestral",
        "Anual",
      ],
    };
  },
  created() {
    this.initialize();
  },

  methods: {
    xd() {
      this.dialog4 = true;
    },
    initialize: function () {
      billsRef.get().then((snapshot) => {
        snapshot.forEach((doc) => {
          const bill = doc.val();
          if (bill.userid == firebase.auth().currentUser.uid) {
            this.items.push(bill);
            this.tcea = bill.tcea;
            this.id = bill.id;
            console.log(this.tcea);
            this.numitems = bill.id;
          } else {
            console.log("ID : ", bill.userid);
            console.log("UID : ", firebase.auth().currentUser.uid);
            console.log("next");
          }
        });
      });
    },

    closebills() {
      this.dialog = false;
      this.$nextTick(() => {
        this.newBill = Object.assign({});
      });
    },

    closetcea() {
      this.dialog2 = false;
      this.$nextTick(() => {
        this.newtcea = Object.assign({});
      });
    },

    closeresults() {
      location.reload();
    },
    addBill() {
      this.error = "";
      if (
        this.newBill.ruc &&
        this.newBill.empresa &&
        this.newBill.emision &&
        this.newBill.fechapago &&
        this.newBill.monto
      ) {
        if (this.kindOfMoney == 1) {
          this.newBill.kindOfMoney = "USD";
        } else {
          this.newBill.kindOfMoney = "PEN";
        }

        //ACTUALIZAR ID
        this.newBill.id = this.id + 1;
        this.id = this.id + 1;

        //ASIGNAR ID DE USUARIO
        this.newBill.userid = firebase.auth().currentUser.uid;
        console.log("USER ID : ", this.newBill.userid);

        //TCEA = 0 PARA QUE APAREZCA EL BOTÓN CALCULAR
        this.newBill.tcea = 0;
        this.buttonid = this.newBill.id;
        console.log(this.buttonid);
        //GUARDANDO KEY DE CADA ITEM
        this.keys.id = this.newBill.id;
        this.keys.key = billsRef.push(this.newBill).getKey();
        keysRef.push(this.keys);
        console.log(this.keys);
        this.items.push(this.newBill);
        //MANDAR EMISION, FECHA DE PAGO Y MONTO A DATABASE TCEA
        this.newBill.tceaID = this.newBill.id;

        this.closebills();
      } else {
        this.error = "Todos los campos son requeridos.";
      }
    },

    getdata: function (btnid) {
      console.log(btnid);
      this.butid = btnid;
      this.newtcea.billid = this.items[btnid - 1].id;
      this.newtcea.emision = this.items[btnid - 1].emision;
      this.newtcea.fechapago = this.items[btnid - 1].fechapago;
      this.newtcea.monto = this.items[btnid - 1].monto;
      this.newtcea.retencion = this.items[btnid - 1].retencion;
      console.log("emision: ", this.items[btnid - 1].emision);
      console.log("fecha de pago: ", this.items[btnid - 1].fechapago);
      console.log("monto: ", this.items[btnid - 1].monto);
      console.log("retencion: ", this.items[btnid - 1].retencion);
      this.dialog2 = true;
    },

    getresults: function (btnid) {
      console.log(btnid);
      this.butid = btnid;
      billsRef.get().then((snapshot) => {
        snapshot.forEach((doc) => {
          const bill = doc.val();
          if (bill.userid == firebase.auth().currentUser.uid) {
            resultsRef.get().then((snap) => {
              snap.forEach((data) => {
                const result = data.val();
                if (result.billid == this.butid) {
                  this.newtcea.tea = result.tea;
                  this.newtcea.nd = result.nd;
                  this.newtcea.te = result.te;
                  this.newtcea.d = result.d;
                  this.newtcea._d = result._d;
                  this.newtcea.rt = result.rt;
                  this.newtcea.ci = result.ci;
                  this.newtcea.vnet = result.vnet;
                  this.newtcea.vr = result.vr;
                  this.newtcea.cf = result.cf;
                  this.newtcea.ve = result.ve;
                  this.newtcea.tcea = result.tcea;
                  this.newtcea.retencion = result.retencion;

                  console.log(this.newtcea);
                }
              });
            });
          }
        });
      });
      this.dialog4 = true;
    },

    calculateTCEA: function (
      fechapago,
      fechadescuento,
      plazo,
      tasa,
      tipotasa,
      capitalizacion,
      dias,
      monto,
      cgi,
      cgf,
      retencion
    ) {
      console.log("Fecha de pago: ", fechapago);
      console.log("Fecha de descuento: ", fechadescuento);
      console.log("Plazo: ", plazo);
      console.log("Tasa: ", tasa);
      console.log("Tipo de tasa: ", tipotasa);
      console.log("Capitalización: ", capitalizacion);
      console.log("Días: ", dias);
      console.log("Monto: ", monto);
      console.log("CGI: ", cgi);
      console.log("CGF: ", cgf);

      console.log("__________");
      /* Dias por año */
      let diasporaño = parseInt(dias);
      console.log("diasporaño: ", dias);
      /* Tiempo de Descuento */
      let fechaPago = moment(fechapago, "YYYY/MM/DD");
      let fechaDescuento = moment(fechadescuento, "YYYY/MM/DD");
      let fechaDiferencia = parseInt(fechaPago.diff(fechaDescuento, "days"));
      let td = fechaDiferencia; //fechapago - fechadescuento;
      console.log("fechaPago: ", fechaPago);
      console.log("FechaDescuento: ", fechaDescuento);
      console.log("Fecha Diferencia: ", fechaDiferencia);
      console.log("td: ", td);

      let cap = Number;
      switch (capitalizacion) {
        case "Diario":
          cap = 1 / 30;
          break;
        case "Quincenal":
          cap = 1 / 2;
          break;
        case "Mensual":
          cap = 1;
          break;
        case "Bimestral":
          cap = 2;
          break;
        case "Trimestral":
          cap = 3;
          break;
        case "Cuatrimestral":
          cap = 4;
          break;
        case "Semestral":
          cap = 6;
          break;
        case "Anual":
          cap = 12;
          break;

        default:
          cap = 12;
          break;
      }
      console.log("cap: ", cap);

      let plaz = Number;
      switch (plazo) {
        case "Diario":
          plaz = 1 / 30;
          break;
        case "Quincenal":
          plaz = 1 / 2;
          break;
        case "Mensual":
          plaz = 1;
          break;
        case "Bimestral":
          plaz = 2;
          break;
        case "Trimestral":
          plaz = 3;
          break;
        case "Cuatrimestral":
          plaz = 4;
          break;
        case "Semestral":
          plaz = 6;
          break;
        case "Anual":
          plaz = 12;
          break;

        default:
          plaz = 12;
          break;
      }
      console.log("Plaz: ", plaz);
      console.log("cap: ", cap);
      /* Tasa Efectiva para un plazo */
      let te = Number;
      if (tipotasa == "Efectiva") {
        //Para Tasa Efectiva
        te = Math.pow(1 + parseFloat(tasa) / 100, td / (plaz * 30)) - 1;
      } else {
        te =
          Math.pow(
            1 + parseFloat(tasa) / 100 / ((plaz * 30) / (cap * 30)),
            td / (cap * 30)
          ) - 1;
      }
      console.log("te: ", te);

      let re = parseFloat(retencion);
      /* Descuento */
      let tasadcto = te / (1 + te);
      let dcto = parseFloat(monto) * tasadcto;
      console.log("tasadcto: ", tasadcto);
      /* Total costo inicial */
      let tci = parseFloat(cgi);
      console.log("tci: ", tci);
      /* Total costo final */
      let tcf = parseFloat(cgf);
      console.log("tcf: ", tcf);
      /* Valor neto */
      let vn = parseFloat(monto) - dcto;
      console.log("vn: ", vn);
      /* Valor recibido */
      let vr = vn - tci - re;
      console.log("vr: ", vr);
      /* Valor entregado */
      let ve = parseFloat(monto) + tcf - re;
      console.log("ve: ", ve);
      /* TCEA */
      let tcea = (Math.pow(ve / vr, diasporaño / td) - 1) * 100;
      console.log("tcea: ", tcea);

      this.newtcea.tea = tasa;
      this.newtcea.ci = tci;
      this.newtcea.nd = td;
      this.newtcea.vnet = vn;
      this.newtcea.te = te * 100;
      this.newtcea.vr = vr;
      this.newtcea.d = tasadcto * 100;
      this.newtcea.cf = tcf;
      this.newtcea._d = dcto;
      this.newtcea.ve = ve;
      this.newtcea.rt = re;
      this.newtcea.tcea = tcea;
      return tcea;
    },

    showTCEA() {
      this.error = "";

      if (
        this.newtcea.dias &&
        this.newtcea.plazo &&
        this.newtcea.tipotasa &&
        this.newtcea.tasa &&
        this.newtcea.fechaDescuento &&
        this.newtcea.gastosIniciales &&
        this.newtcea.valorEfectivoGI &&
        this.newtcea.gastosFinales &&
        this.newtcea.valorEfectivoGF
      ) {
        let tceafinal = this.calculateTCEA(
          this.newtcea.fechapago,
          this.newtcea.fechaDescuento,
          this.newtcea.plazo,
          this.newtcea.tasa,
          this.newtcea.tipotasa,
          this.newtcea.capitalizacion,
          this.newtcea.dias,
          this.newtcea.monto,
          this.newtcea.valorEfectivoGI,
          this.newtcea.valorEfectivoGF,
          this.newtcea.retencion
        );
        resultsRef.push(this.newtcea);

        billsRef.get().then((snapshot) => {
          snapshot.forEach((doc) => {
            const bill = doc.val();
            if (bill.userid == firebase.auth().currentUser.uid) {
              if (bill.id == this.butid) {
                console.log("bill id: ", bill.id);
                console.log("button id: ", this.butid);
                console.log(this.keys);
                keysRef.get().then((snap) => {
                  snap.forEach((data) => {
                    const key = data.val();
                    if (key.id == this.butid) {
                      firebase
                        .database()
                        .ref("bills/" + key.key)
                        .update({
                          tcea: tceafinal,
                        });
                      console.log("paso: key: ", key.id, "butid: ", this.butid);
                    }
                  });
                });
              }
            }
          });
        });
        this.dialog2 = false;
        this.dialog3 = true;
      } else {
        this.error = "Todos los campos son requeridos.";
      }
    },
    crearcartera() {
      billsRef.get().then((snapshot) => {
        snapshot.forEach((doc) => {
          const bill = doc.val();
          if (bill.userid == firebase.auth().currentUser.uid) {
            resultsRef.get().then((snap) => {
              snap.forEach((data) => {
                const result = data.val();
                console.log(result);
              });
            });
          }
        });
      });
    },
  },
};
</script>

<style scoped>
.bills-card {
  padding: 20px;
  margin: 50px;
}

.wallet-card {
  padding: 20px;
  margin: auto;
  width: 50%;
}

.col-register {
  padding-block: 0px;
}

.card-dialog {
  width: 100vh;
  padding: 5%;
}

.tcea-dialog {
  width: 100vh;
  padding: 3%;
}

.results-dialog {
  width: 100vh;
  padding: 5%;
}

.formtasa {
  text-align: end;
  align-items: flex-end;
}

.switch-toggle {
  position: absolute;
  display: flex;
  left: 80%;
}

.resultado {
  padding: 10px;
  border: 1px solid black;
  border-radius: 10px;
  border-collapse: collapse;
  text-align: right;
  background-color: rgb(247, 247, 247);
}

.PEN {
  font-size: 15px;
}
</style>
