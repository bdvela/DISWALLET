<template>
    <v-app>
        <v-row align="center justify-center">
             <v-col cols="auto">
                 <v-row class="text-center justify-center mb-2">
                <v-alert v-if="error" color="red" type="error" width="35%" >
                    {{error}}
                </v-alert>
                </v-row>
            <v-card class="register-card" rounded="xl" elevation="12">
                <v-card-title class="justify-center">
                    <h1>REGISTRO</h1>
                </v-card-title>
                <v-card-text>
                    <v-form class="mt-12" @submit.prevent="register">
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6" class="col-register">
                                    <v-subheader>RUC</v-subheader> 
                                    <v-text-field v-model="ruc" filled rounded autofocus placeholder="RUC" name="Ruc" type="text" color="primary accent-3"/>
                                </v-col>
                                <v-col cols="12" sm="6" class="col-register">
                                    <v-subheader>Nombre y Apellido</v-subheader> 
                                    <v-text-field v-model="nombres" filled rounded id="nombre" placeholder="nombre y apellido" name="nombre" type="text" color="primary accent-3"/>
                                </v-col>
                                <v-col cols="12" sm="6" class="col-register">
                                    <v-subheader>Email</v-subheader> 
                                    <v-text-field v-model="email" filled rounded id="email" placeholder="email" name="email" type="email" color="primary accent-3"/>
                                </v-col>
                                <v-col cols="12" sm="6" class="col-register">
                                    <v-subheader>Celular</v-subheader> 
                                    <v-text-field v-model="celular" filled rounded id="celular" placeholder="celular" name="celular" type="number" color="primary accent-3"/>
                                </v-col>
                                <v-col cols="12" sm="6" class="col-register">
                                    <v-subheader>Contraseña</v-subheader> 
                                    <v-text-field v-model="contraseña" filled rounded id="password1" placeholder="**********" name="password1" type="password" color="primary accent-3"/>
                                </v-col>
                            </v-row>
                            <div class="text-center mt-2 ">
                                <v-btn rounded x-large color="primary" type="submit">Registrarme</v-btn>
                            </div>  
                        </v-container>
                    </v-form>
                </v-card-text>
            </v-card>
            </v-col>
        </v-row>
    </v-app>
</template>

<script>
export default ({
    data () {
        return {
            ruc: '',
            nombres: '',
            email: '',
            celular: '',
            contraseña: '',
            error: ''
        }
    },
    name: 'Register',
    methods: {
        register () {
            if (this.ruc && this.nombres && this.email && this.celular && this.contraseña) {
                //
            } 
            else {
                this.error = 'Todos los campos son requeridos.'
            }
        },      
    }
})
</script>

<style scoped>

.register-card{
    width: 100vh;
    text-align: center;
    padding: 10%;
}

.col-register{
    padding-block: 0px;
}

.inputPrice input[type='number'] {
    -moz-appearance:textfield;
}
.inputPrice input::-webkit-outer-spin-button,
.inputPrice input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

</style>
