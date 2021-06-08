<template>
  <v-card>
    <v-card-title>
      {{ name }}
    </v-card-title>
    <v-container>
      <v-row>
        <v-col cols="6"
          ><p>
            <v-icon class="mr-2" color="primary">mdi-calendar-clock</v-icon>
            Termin:
          </p></v-col
        >
        <v-col cols="6" class="mb-2"
          ><h4>{{ startDate ? formatDate(startDate) : "Unbekannt" }}</h4></v-col
        >
      </v-row>
      <v-row>
        <v-col cols="6" class="mb-2"
          ><p>
            <v-icon class="mr-2" color="primary">mdi-account-group</v-icon>
            Teilnehmer (Teams):
          </p></v-col
        >
        <v-col cols="6"><h4>{{teamCount}}</h4></v-col>
      </v-row>
      <v-row>
        <v-col cols="12" align="right">
          <v-btn class="ml-2" color="primary" @click="onSelectClicked"
            >Übersicht &amp; Bearbeiten
            <v-icon right>mdi-send</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import * as moment from "moment";

export default {
  props: {
    name: {
      type: String,
      default: "Unbekannt",
    },
    startDate: {
      type: String | undefined,
      default: undefined,
    },
    teamCount: {
      type: Number,
      default: 0
    }
  },
  data: () => {
    return {};
  },
  methods: {
    onSelectClicked() {
      this.$emit("select");
    },
    formatDate(date) {
      return moment(date).format("DD.MM.YYYY HH:mm");
    },
  },
};
</script>
