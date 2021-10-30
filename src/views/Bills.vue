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
                    <span class="text-h3 formtitle">{{ formTitle }}</span>
                </v-card-title>
                <div class="switch-toggle">
                    <v-subheader class="PEN">PEN</v-subheader>
                    <v-switch
                    v-model="kindOfMoney"
                    label= "USD"
                    class="mt-2 "
                    ></v-switch>  
                </div>
                
                <v-card-text> 
                    <v-form class="mt-12">
                    <v-container class="container-forms">
                        <v-row >
                            <v-col class="col-register"
                            cols="12"
                            sm="6"
                          
                            >
                            <v-subheader>RUC</v-subheader> 
                                <v-text-field
                                v-model="editedItem.ruc"
                                placeholder="RUC"
                                autofocus
                                filled
                                rounded
                                ></v-text-field>
                            </v-col>
                            <v-col class="col-register"
                            cols="12"
                            sm="6"
                           
                            >
                            <v-subheader>Razón Social</v-subheader> 
                                <v-text-field
                                v-model="editedItem.empresa"
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
                                v-model="editedItem.emision"
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
                                v-model="editedItem.fechapago"
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
                                v-model="editedItem.monto"
                                placeholder="0.00"
                                type="number"
                                filled
                                rounded
                                ></v-text-field>
                            </v-col>                 
                        </v-row>
                    </v-container>
                    </v-form>
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn 
                    color="primary"
                    rounded
                    x-large
                    @click="save"
                    >Registrar Factura</v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>


             
            </v-card-title>
            <v-divider light ></v-divider>
            <v-data-table
            :headers="headers"
            :items="id"
            :search="search"
            hide-default-footer
            >
            </v-data-table>
        </v-card>
        
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
    components: {
        Navbar
    },
    data: () => ({
        search: '',
        dialog: false,
        dialogDelete: false,
        headers: [
                {
                    text: 'ID',
                    align: 'start',
                    value: 'id',
                },
                { text: 'Fecha de emisión', value: 'emision'},
                { text: 'Nombre de la empresa', value: 'empresa' },
                { text: 'Monto', value: 'monto' },
                { text: 'Fecha de pago', value: 'fechapago' },
                { text: 'TCEA (%)', value: 'TCEA' },
        ],
        id: [],
        editedIndex: -1,
        editedItem: {
            id: 0,
            emision: '',
            empresa: '',
            monto: '',
            fechapago: '',
        },
        defaultItem: {
            id: 0,
            emision: '',
            empresa: '',
            monto: '',
            fechapago: '',
        },
    }),
    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'NUEVA FACTURA' : 'Editar Factura'
        },
    },

    watch: {
        dialog (val) {
            val || this.close()
        },
        dialogDelete (val) {
            val || this.CloseDelete()
        },
    },
    
    created () {
        this.initialize()
    },

    methods: {
        initialize (){
            this.id = [
                {
                    id: '1',
                    emision: '24/09/2021',
                    empresa: 'UPC',
                    monto: 'S/6500',
                    fechapago: '24/12/2021',
                    TCEA: '95.55%',
                },
                {
                    id: '2',
                    emision: 237,
                    empresa: 9.0,
                    monto: 37,
                    fechapago: 4.3,
                    TCEA: '1%',
                },
                {
                    id: '3',
                    emision: 518,
                    empresa: 26.0,
                    monto: 65,
                    fechapago: 7,
                    TCEA: '6%',
                },
            ]
        },
        
        editedItem (item) {
            this.editedItem = this.id.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem (item) {
            this.editedIndex = this.id.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm () {
            this.id.splice(this.editedIndex, 1)
            this.CloseDelete()
        },

        close () {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        CloseDelete () {
            this.dialogDelete = false
            this.$$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save () {
            if (this.editedIndex > -1) {
                Object.assign(this.id[this.editedIndex], this.editedItem)
            } else {
                this.id.push(this.editedItem)
            }
            this.close()
        },
    },
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