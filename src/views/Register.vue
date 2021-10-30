<template>
    <v-app>
        <v-row align="center justify-center">
             <v-col cols="auto" align-self="center">
            <v-card class="register-card" rounded="xl" elevation="12">
                <v-card-title class="justify-center">
                    <h1>REGISTRO</h1>
                </v-card-title>
                <v-card-text>
                    <v-form class="mt-12">
                        <v-container>
                            <v-row >
                                <v-col cols="12" sm="6" class="col-register">
                                    <v-subheader>RUC</v-subheader> 
                                    <v-text-field filled rounded autofocus placeholder="RUC" name="Ruc" type="text" color="primary accent-3"/>
                                </v-col>
                                <v-col cols="12" sm="6" class="col-register">
                                    <v-subheader>Nombre y Apellido</v-subheader> 
                                    <v-text-field filled rounded id="nombre" placeholder="nombre y apellido" name="nombre" type="text" color="primary accent-3"/>
                                </v-col>
                                <v-col cols="12" sm="6" class="col-register">
                                    <v-subheader>Email</v-subheader> 
                                    <v-text-field filled rounded id="email" placeholder="email" name="email" type="email" color="primary accent-3"/>
                                </v-col>
                                <v-col cols="12" sm="6" class="col-register">
                                    <v-subheader>Celular</v-subheader> 
                                    <v-text-field filled rounded id="celular" placeholder="celular" name="celular" type="number" color="primary accent-3"/>
                                </v-col>
                                <v-col cols="12" sm="6" class="col-register">
                                    <v-subheader>Contraseña</v-subheader> 
                                    <v-text-field filled rounded id="password1" placeholder="**********" name="password1" type="password" color="primary accent-3"/>
                                </v-col>
                                <v-col cols="12" sm="6" class="col-register">
                                    <v-subheader>Confirmar contraseña</v-subheader> 
                                    <v-text-field filled rounded id="password2" placeholder="**********" name="password2" type="password" color="primary accent-3"/>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
                <v-card-actions class="justify-center">
                    <div class="text-center mt-2">
                        <router-link to="./successregister"><v-btn rounded x-large color="primary">Registrarme</v-btn></router-link>
                    </div>
                </v-card-actions>
            </v-card>
            </v-col>
        </v-row>
    </v-app>
</template>

<script>
export default ({
    name: 'Register'
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
