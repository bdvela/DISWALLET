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
                <div v-if="item.tcea == 0">
                <v-btn rounded small color="primary"
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

let db = firebase.database()
let billsRef = db.ref('bills')
export default {
    name: 'Bills',
    components: {
        Navbar
    },

    firebase: {
        bills: billsRef                                                             
    },
    data () {
        return {
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
            items: [],
            id: 0,
            notcea: 0,
            error: '',
            editedIndex: -1,
            dialog: false,
            newBill: {
                id: 0,
                ruc: '',
                empresa: '',
                emision: '',
                fechapago: '',
                monto: '',
                kindOfMoney: '',
                tcea: 0
            },         
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
                    this.items.push(bill)
                    this.tcea = bill.tcea
                    this.id = bill.id
                    console.log(this.tcea)
                })
        })
        },

        HaveTcea(tcea){
            if(tcea == 0){
                return 1
            }
            else{
                return 0
            }
        },

        close () {
            this.dialog=false
             this.$nextTick(() => {
                this.newBill = Object.assign({})
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
                
                //TCEA = 0 PARA QUE APAREZCA EL BOTÓN CALCULAR
                this.newBill.tcea = 0

                billsRef.push(this.newBill);
                this.items.push(this.newBill);
                this.close()
            } else {
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


.switch-toggle{
    position: absolute;
    display: flex;
    left: 80%;
}

.PEN{
    font-size: 15px;
}

</style>