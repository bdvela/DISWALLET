<template>
    <div>
        <Navbar></Navbar>
        <v-card class="bills-card">
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
            label="Search"
            single-line
            hide-details
            ></v-text-field>
             <v-btn fab><v-icon>mdi-magnify</v-icon></v-btn>
             <v-spacer></v-spacer>
            <v-btn fab color="primary"><v-icon>mdi-plus</v-icon></v-btn>
            </v-card-title>
            <v-divider light ></v-divider>
            <v-data-table
            :headers="headers"
            :items="id"
            :items-per-page="5"
            class="elevation-2"
            disable-filtering
            disable-pagination
            disable-sort
            >
            </v-data-table>
        </v-card>
        
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default ({
    components: {
        Navbar
    },
    
    data (){
        return{
            headers: [
                {
                    text: 'ID',
                    align: 'start',
                    sortable: false,
                    value: 'id',
                },
                { text: 'Fecha de emisión', value: 'emision'},
                { text: 'Nombre de la empresa', value: 'empresa' },
                { text: 'Monto', value: 'monto' },
                { text: 'Fecha de pago', value: 'fechapago' },
                { text: 'TCEA (%)', value: 'TCEA' },
            ],
            id: [
                {
                    id: '1',
                    emision: '24/09/2021',
                    empresa: 'UPC',
                    monto: 'S/6500',
                    protein: '24/12/2021',
                    TCEA: '95.55%',
                },
                {
                    id: '2',
                    emision: 237,
                    empresa: 9.0,
                    monto: 37,
                    protein: 4.3,
                    TCEA: '1%',
                },
                {
                    id: '3',
                    emision: 518,
                    empresa: 26.0,
                    monto: 65,
                    protein: 7,
                    TCEA: '6%',
                },
            ],
        }
    }
})
</script>

<style scoped>

.bills-card{
    padding: 20px;
}

</style>