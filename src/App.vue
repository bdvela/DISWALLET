<template>
  <v-app>
    <v-main>
      <v-content>
        <router-view />
      </v-content>
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
#app {
  color: #7146ed;
  background-color: rgb(249, 249, 249);
}

span {
  color: #7146ed;
  font-weight: bolder;
}
</style>
