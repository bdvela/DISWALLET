<template>
    <div>
        <Navbar></Navbar>
        <v-card class="bills-card" elevation="4" rounded="xl" >
            
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
            <v-dialog
            v-model="dialog"
            max-width="100vh"
            >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                color="primary"
                fab
                v-bind="attrs"
                v-on="on"
                >
                <v-icon>mdi-plus</v-icon>
                </v-btn>
            </template>
            
            <v-card class="card-dialog" rounded="xl" elevation="12">
                <v-card-title class="justify-center">
                    <span class="text-h3 formtitle">NUEVA FACTURA</span>
                </v-card-title>
                <v-alert v-if="error" color="red" type="error" >
                {{error}}
                </v-alert>
                <div class="switch-toggle">
                    <v-subheader class="PEN">PEN</v-subheader>
                    <v-switch
                    v-model="kindOfMoney"
                    label= "USD"
                    class="mt-2 "
                    ></v-switch>  
                </div>
                <v-card-text> 
                    <v-form class="mt-12" @submit.prevent="addBill">
                    <v-container class="container-forms">
                        <v-row >
                            <v-col class="col-register"
                            cols="12"
                            sm="6"
                            >
                            <v-subheader>RUC</v-subheader> 
                                <v-text-field 
                                v-model="newBill.ruc"
                                placeholder="RUC"
                                autofocus
                                filled
                                rounded
                                required></v-text-field>
                            </v-col>
                            <v-col class="col-register"
                            cols="12"
                            sm="6"
                           
                            >
                            <v-subheader>Razón Social</v-subheader> 
                                <v-text-field
                                v-model="newBill.empresa"
                                placeholder="razón social"
                                filled
                                rounded
                                ></v-text-field>
                            </v-col>
                            <v-col class="col-register"
                            cols="12"
                            sm="6"
                           
                            >
                            <v-subheader>Fecha de emisión</v-subheader> 
                                <v-text-field
                                v-model="newBill.emision"
                                placeholder="dd/mm/aaaa"
                                type="date"
                                filled
                                rounded
                                ></v-text-field>
                            </v-col>
                            
                            <v-col class="col-register"
                            cols="12"
                            sm="6"
                           
                            >
                            <v-subheader>Fecha de pago</v-subheader> 
                                <v-text-field
                                v-model="newBill.fechapago"
                                placeholder="dd/mm/aaaa"
                                type="date"
                                filled
                                rounded
                                ></v-text-field>
                            </v-col>    
                            <v-col class="col-register"
                            cols="12"
                            sm="6"
                           
                            >
                            <v-subheader>Monto Total</v-subheader> 
                                <v-text-field
                                v-model="newBill.monto"
                                placeholder="0.00"
                                type="number"
                                filled
                                rounded
                                ></v-text-field>
                            </v-col>                 
                        </v-row>
                         <div class="text-center mt-2 ">
                            <v-btn 
                            color="primary"
                            rounded
                            x-large
                            type="submit"
                            >Registrar Factura</v-btn>
                         </div>
                    </v-container>
                    </v-form>
                </v-card-text>
            </v-card>
            </v-dialog>
    <!--CUADRO DE DIALOGO CALCULTO TCEA-->
            <v-dialog
            v-model="dialog2"
            max-width="100vh"
            >
            <template v-slot:activator="{ on, attrs }">
                <div
                color="primary"
                fab
                v-bind="attrs"
                v-on="on"
                disabled
                >
                </div>
            </template>
            
            <v-card class="tcea-dialog" rounded="xl" elevation="12" >
                <v-card-title class="justify-center">
                    <span class="text-h3">CALCULAR TCEA</span>
                </v-card-title>
                <v-alert v-if="error" color="red" type="error" >
                {{error}}
                </v-alert>
                <v-card-text> 
                    <v-form class="mt-12" @submit.prevent="showTCEA">
                    <v-container class="container-forms">
                        <v-row >
                            
                            <v-col class="col-register"
                            cols="12"
                            sm="4"
                            >
                            <h3>Tasa y plazo</h3>
                            <v-subheader>Días por año</v-subheader> 
                                <v-select 
                                :items="days"
                                v-model="newtcea.dias"
                                placeholder="días por año"
                                autofocus
                                filled
                                rounded
                                required></v-select>
                            </v-col>

                            <v-col class="col-register"
                            cols="12"
                            sm="4"
                            >
                            <h3>Costes / Gastos</h3>
                            <v-subheader>Gastos iniciales: </v-subheader> 
                                <v-select
                                :items="gastos"
                                v-model="newtcea.gastosIniciales"
                                placeholder="motivo"
                                filled
                                rounded
                                ></v-select>
                            </v-col>

                            <v-col class="col-register"
                            cols="12"
                            sm="4"
                            >
                            <h3>Datos de la factura</h3>
                            <v-subheader>Fecha de emisión</v-subheader> 
                                <v-text-field
                                v-model="newtcea.emision"
                                outlined
                                disabled
                                filled
                                type="date"
                                rounded
                                required></v-text-field>
                            </v-col>
                            
                            <v-col class="col-register"
                            cols="12"
                            sm="4"
                            >
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
                            
                            <v-col class="col-register"
                            cols="12"
                            sm="4"
                            >
                            <v-subheader>Valor total en efectivo</v-subheader> 
                                <v-text-field
                                v-model="newtcea.valorEfectivoGI"
                                placeholder="gastos iniciales"
                                type="number"
                                filled
                                rounded
                                ></v-text-field>
                            </v-col> 

                            <v-col class="col-register"
                            cols="12"
                            sm="4"
                            >
                            <v-subheader>Fecha de pago</v-subheader> 
                                <v-text-field 
                                v-model="newtcea.fechapago"
                                outlined
                                disabled
                                filled
                                type="date"
                                rounded
                                required></v-text-field>
                            </v-col>

                            <v-col class="col-register"
                            cols="12"
                            sm="4"
                            >
                            <v-subheader>Tasa</v-subheader>
                            <v-row class="formtasa">
                            <v-col class="col-register "
                            cols="12"
                            sm="6"
                            ><v-radio-group 
                                v-model="newtcea.tipotasa">
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
                            <v-col class="col-register" 
                            cols="12"
                            sm="6"
                            >
                            <v-text-field 
                                v-model="newtcea.tasa"
                                type="number"
                                placeholder="(%)"
                                filled
                                rounded
                            ></v-text-field>
                            </v-col>
                            </v-row>
                            </v-col> 
                            <v-col class="col-register"
                            cols="12"
                            sm="4"
                            >
                            <v-divider></v-divider>
                            <v-subheader>Gastos finales: </v-subheader> 
                                <v-select
                                :items="gastos"
                                v-model="newtcea.gastosFinales"
                                placeholder="motivo"
                                filled
                                rounded
                                ></v-select>
                            </v-col>      

                            <v-col class="col-register"
                            cols="12"
                            sm="4"
                            >
                            <v-subheader>Total facturado</v-subheader> 
                                <v-text-field
                                v-model="newtcea.monto"
                                outlined
                                disabled
                                filled
                                rounded
                                required></v-text-field>
                            </v-col>

                            <v-col class="col-register"
                            cols="12"
                            sm="4"
                            >
                            <v-subheader>Fecha de descuento</v-subheader> 
                                <v-text-field
                                v-model="newtcea.fechaDescuento"
                                placeholder="dd/mm/aaaa"
                                type="date"
                                filled
                                rounded
                                ></v-text-field>
                            </v-col>       
                            <v-col class="col-register"
                            cols="12"
                            sm="4"
                           
                            >
                            <v-subheader>Valor total en efectivo</v-subheader> 
                                <v-text-field
                                v-model="newtcea.valorEfectivoGF"
                                placeholder="gastos finales"
                                type="number"
                                filled
                                rounded
                                ></v-text-field>
                            </v-col>                
                        </v-row>
                         <div class="text-center mt-2 ">
                            <v-btn 
                            color="primary"
                            rounded
                            x-large
                            type="submit"
                            >Calcular</v-btn>
                         </div>
                    </v-container>
                    </v-form>
                </v-card-text>
            </v-card>
            </v-dialog>
            </v-row>

            </v-card-title>
            <v-divider light ></v-divider>
            <v-data-table
            :headers="headers"
            :items="items"
            :search="search"
            hide-default-footer
            items-per-page="50"
            >
            <template #item.tcea="{item}">
                <div v-if="item.tcea == 0" >
                <v-btn rounded small color="primary"
                @click.stop="getdata(item.id)"
                >Calcular</v-btn>
                </div>
                <div v-else>
                    {{item.tcea}}
                </div>
            </template>
            </v-data-table>
        </v-card>
        
    </div>
</template>

<script>
import firebase from 'firebase/compat/app'
import Navbar from '../components/Navbar.vue'
import moment from 'moment'  

let db = firebase.database()
let billsRef = db.ref('bills')
let tceaRef = db.ref('tceax')
let keysRef = db.ref('keysx')
export default {
    name: 'Bills',
    components: {
        Navbar
    },

    firebase: {
        bills: billsRef,    
        tceax: tceaRef,
        keysx: keysRef                                            
    },
    data () {
        return {
            totalfacturado: 'hola',
            search: '',
            headers: [
                {
                    text: 'ID',
                    align: 'start',
                    value: 'id',
                },
                { text: 'Nombre de la empresa', value: 'empresa' },
                { text: 'Fecha de emisión', value: 'emision'},
                { text: 'Fecha de pago', value: 'fechapago' },
                { text: 'Monto', value: 'monto' },
                { text: 'DIVISA', value: 'kindOfMoney'},
                { text: 'TCEA (%)', value: 'tcea', sortable: false },
            ],
            butid: 0,
            items: [],
            id: 0,
            id2: 0,
            notcea: 0,
            error: '',
            editedIndex: -1,
            dialog: false,
            dialog2: false,
            keys: {
                id: 0,
                key: ''
            },
            newtcea: {
                billid: '',
                dias: '',
                plazo: '',
                tipotasa: '',
                tasa: '',
                fechaDescuento: '',
                gastosIniciales: '',
                valorEfectivoGI: '',
                gastosFinales: '',
                valorEfectivoGF: '',
                emision: '',
                monto: '',
                fechapago: '',
                tcea: 0,

            },
            newBill: {
                userid: 0,
                id: 0,
                ruc: '',
                empresa: '',
                emision: '',
                fechapago: '',
                monto: '',
                kindOfMoney: '',
                tcea: 0,
                
            },   
            // V-SELECT TCEA
            days: [
                360,
                365
            ], 
            plazo: [
                'Diario',
                'Quincenal',
                'Mensual',
                'Bimestral',
                'Trimestral',
                'Cuatrimestral',
                'Semestral',
                'Anual'
            ],
            gastos: [
                'Portes',
                'Fotocopias',
                'Gastos de administración',
                'Gastos notariales',
                'Gastos registrales',
                'Seguro',
                'Otros gastos'
            ],
        }
    },
    created(){
        this.initialize()
    },


    methods: {
        
        initialize: function(){
            
            billsRef
            .get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    const bill = doc.val()
                    if ( bill.userid == firebase.auth().currentUser.uid){
                        this.items.push(bill)
                        this.tcea = bill.tcea
                        this.id = bill.id
                        console.log(this.tcea)
                        this.numitems = bill.id
                    }
                    else {
                        console.log('ID : ',bill.userid)
                        console.log('UID : ',firebase.auth().currentUser.uid)
                        console.log('next')
                    }
                })
        })
        },
        
        closebills () {
            
            this.dialog=false
             this.$nextTick(() => {
                this.newBill = Object.assign({})
            })
        },

        closetcea() {
            this.dialog2 = false
             this.$nextTick(() => {
                this.newtcea = Object.assign({})
            })
        },
        addBill() {
            this.error = ''
            if(this.newBill.ruc && this.newBill.empresa && this.newBill.emision && this.newBill.fechapago && this.newBill.monto){
                 if(this.kindOfMoney == 1){
                    this.newBill.kindOfMoney = 'USD'
                 }
                 else{
                     this.newBill.kindOfMoney = 'PEN'
                 }

                //ACTUALIZAR ID 
                this.newBill.id = this.id+1
                this.id = this.id+1
                                
                //ASIGNAR ID DE USUARIO
                this.newBill.userid = firebase.auth().currentUser.uid;
                console.log('USER ID : ',this.newBill.userid)

                //TCEA = 0 PARA QUE APAREZCA EL BOTÓN CALCULAR
                this.newBill.tcea = 0
                this.buttonid = this.newBill.id
                console.log(this.buttonid)
                //GUARDANDO KEY DE CADA ITEM
                this.keys.id = this.newBill.id
                this.keys.key =  billsRef.push(this.newBill).getKey()
                keysRef.push(this.keys)
                console.log(this.keys)
                this.items.push(this.newBill);
                //MANDAR EMISION, FECHA DE PAGO Y MONTO A DATABASE TCEA
                this.newBill.tceaID = this.newBill.id
                
                this.closebills()
            } else {
                this.error = 'Todos los campos son requeridos.'
            }
           
           
        },
        
        getdata : function(btnid){    
           console.log(btnid)
           this.butid = btnid
           this.newtcea.billid = this.items[btnid-1].id
           this.newtcea.emision = this.items[btnid-1].emision
           this.newtcea.fechapago = this.items[btnid-1].fechapago
           this.newtcea.monto = this.items[btnid-1].monto
           console.log('emision: ',this.items[btnid-1].emision)
           console.log('fecha de pago: ',this.items[btnid-1].fechapago)
           console.log('monto: ',this.items[btnid-1].monto)

           this.dialog2 = true
        },

        calculateTCEA: function(monto, dias, fechapago, tasa, fechadescuento, cgi, cgf){
            console.log("monto: ", monto);
            console.log("dias: ", dias);
            console.log("fechapago: ", fechapago);
            console.log("tasa: ", tasa);
            console.log("fechadescuento: ", fechadescuento);
            console.log("cgi: ", cgi);
            console.log("cgf: ", cgf);
            let tf = parseFloat(monto)
            
            let diasAnio = parseFloat(dias)

            let fechPago = moment(fechapago, "YYYY/MM/DD")
            console.log("fechapago: ", fechPago);
            let fechaDesc = moment(fechadescuento, "YYYY/MM/DD")

            console.log("fechapago: ", fechaDesc);
            let fechaDiff = parseInt(fechPago.diff(fechaDesc, "days"))
            console.log("fechaDiff: ", fechaDiff);

            let numDias = fechaDiff

            let te = parseFloat(Math.pow(1+parseFloat(tasa)/100, numDias / diasAnio) -1)

            let td = te / (1 + te)

            let desct = parseFloat(Math.round(td * tf * 100)/100)

            let tci = parseFloat(cgi)

            let tcf = parseFloat(cgf)

            console.log("Valor nominal: ", parseInt(monto));
            console.log("desct: ", desct);
            console.log("tci: ", tci)
            console.log("tcf: ", tcf)

            let vn = parseInt(monto) - desct
            console.log("vn: ", vn);

            let vr = vn -tci
            console.log("vr: ", vr);

            let ve = parseFloat(monto) + tcf
            console.log("ve: ", ve);

            let tcea = Math.pow(ve / vr, diasAnio / numDias) - 1;
            console.log("tcea: ", tcea*100)
            return tcea*100
        },
        
        showTCEA(){
            this.error = ''
                
            if(this.newtcea.dias && this.newtcea.plazo && this.newtcea.tipotasa && this.newtcea.tasa && this.newtcea.fechaDescuento && this.newtcea.gastosIniciales && this.newtcea.valorEfectivoGI && this.newtcea.gastosFinales && this.newtcea.valorEfectivoGF){
                
                let tceafinal = this.calculateTCEA(this.newtcea.monto, this.newtcea.dias, this.newtcea.fechapago, this.newtcea.tasa, this.newtcea.fechaDescuento, this.newtcea.valorEfectivoGI, this.newtcea.valorEfectivoGF)
                this.newtcea.tcea = tceafinal
                tceaRef.push(this.newtcea)
                console.log(tceafinal)
                
             billsRef
            .get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    const bill = doc.val()
                    if ( bill.userid == firebase.auth().currentUser.uid){
                        if(bill.id == this.butid){
                            console.log('bill id: ', bill.id)
                            console.log('button id: ', this.butid); 
                            console.log(this.keys)
                            keysRef.get().then(snap => {
                                snap.forEach(data => {
                                    const key = data.val()
                                    if( key.id == this.butid) {
                                       firebase.database().ref('bills/' + key.key ).update({
                                           tcea:tceafinal
                                       })
                                    }
                                })
                            })
                            
                        }
                    }
                }
                )
            })
            this.closetcea()
            }
            else {
                this.error = 'Todos los campos son requeridos.'
            }
        }
    }
}
</script>

<style scoped>

.bills-card{
    padding: 20px;
    margin: 50px;
}

.col-register{
    padding-block: 0px;
}

.card-dialog{
    width: 100vh;
    padding: 5%;
}

.tcea-dialog{
    width: 100vh;
    padding: 3%;
}

.formtasa{
    text-align: end;
    align-items: flex-end;
}

.switch-toggle{
    position: absolute;
    display: flex;
    left: 80%;
}

.PEN{
    font-size: 15px;
}

</style>