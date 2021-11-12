<template>
  <v-app >
    <v-main>
      <v-container>
        <router-view/>    
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style>
 #app{
    color: #7146ED;
  }
 
span{
  color: #7146ED;
  font-weight: bolder;
}

</style>