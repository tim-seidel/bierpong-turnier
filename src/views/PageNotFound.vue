<template>
  <v-container style="max-width: 800px">
    <v-card>
      <v-card-title class="justify-center"
        >Ups! Unbekannte Seite =(</v-card-title
      >
      <v-card-text>
        <v-img
          class="mb-4"
          :src="require('../assets/logo_small.png')"
          contain
        />
        <v-row>
          <v-col cols="12">
            <v-btn
              color="primary"
              block
              @click="$router.push({ name: 'Landing' })"
            >
              <v-icon class="mr-2">mdi-back</v-icon>
              Zur Startseite
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  data: () => {
    return {};
  },

  methods: {},
});
</script>