<template>
  <v-app-bar color="primary" dark app>
    <v-img
      class="logo mr-2"
      :src="require('../../assets/logo_small.png')"
      style="max-width: 64px"
      contain
    />
    <router-link to="/">
      <v-toolbar-title class="white--text">BierPong-Turnier</v-toolbar-title>
    </router-link>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  data: () => {
    return {};
  },
});
</script>
