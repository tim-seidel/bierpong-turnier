<template>
  <v-card>
    <v-card-title>
      Allgemeine Daten:
      <v-spacer></v-spacer>
      <v-btn color="primary"
        ><v-icon class="mr-2" color="white">mdi-pencil-outline</v-icon
        >Ändern</v-btn
      >
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="4">
          <p>
            <v-icon class="mr-2" color="primary">mdi-trophy</v-icon>
            <strong> Turniername:</strong>
          </p>
        </v-col>
        <v-col cols="8">
          <p>{{ name }}</p></v-col
        >
      </v-row>
      <v-row align="center">
        <v-col cols="4">
          <p>
            <v-icon class="mr-2" color="primary">mdi-calendar-clock</v-icon>
            <strong> Termin:</strong>
          </p>
        </v-col>
        <v-col cols="8"> <p>{{startDate ? startDate : "Unbekannt"}}</p></v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    name: {
      type: String,
      default: "Unbekannt",
    },
    startDate: {
      type: Date | undefined,
      default: undefined,
    },
  },
  data: () => {
    return {};
  },
});
</script>