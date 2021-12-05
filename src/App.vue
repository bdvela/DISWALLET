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
  background: rgb(255, 255, 255);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 1) 0%,
    rgba(242, 244, 246, 0.9948354341736695) 38%
  );
}

span {
  color: #7146ed;
  font-weight: bolder;
}
</style>
