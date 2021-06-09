<template>
  <v-container style="max-width: 800px;">
    <v-card>
      <v-card-title class="justify-center">Herzlich Willkommen!</v-card-title>
      <v-card-text>
        <v-img
          class="mb-4"
          :src="require('../assets/logo_small.png')"
          contain
        />

        <v-row>
          <v-col cols="12" sm="6">
            <v-btn
              color="primary"
              block
              @click="$router.push({ name: 'TournamentCreation' })"
            >
              <v-icon class="mr-2">mdi-plus</v-icon>
              Turnier erstellen
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6">
            <v-btn
              block
              color="primary"
              @click="$router.push({ name: 'ManagingLanding' })"
            >
              <v-icon class="mr-2">mdi-clipboard-edit</v-icon>
              Turnierverwaltung
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="primary white--text" primary-title
            >Laufendes Turnier fortfahren?</v-card-title
          >
          <v-card-text class="black--text mt-4">{{ message }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red lighten-2" text @click="dismissTournament"
              >Zurücksetzen</v-btn
            >
            <v-btn color="primary" text @click="loadTournament"
              >Fortsetzen</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
import Vue from "vue";

import TeamChip from "@/components/TeamChip";

import { getTournament } from "../services/TournamentService";

export default Vue.extend({
  components: {
    TeamChip,
  },
  data: () => {
    return {
      dialog: false,
      message: "",
      tournament: null,
    };
  },

  methods: {
    showDialog(message) {
      this.message = message;
      this.dialog = true;
    },
    loadTournament() {
      this.dialog = false;
      this.$store.state.tournament.current = this.tournament;
      localStorage.setItem("currentTournamentId", this.tournament?.id);
      this.$router.push("groupstage");
    },
    dismissTournament() {
      this.dialog = false;
      this.tournament = null;
      this.$store.state.tournament.current = null;
      localStorage.removeItem("currentTournamentId");
    },
  },

  beforeMount() {
    if (this.$store.getters.tournament != null) {
      this.tournament = this.$store.getters.tournament;
      this.showDialog(
        "Du hast akutell ein Turnier geladen, möchtest du damit fortfahren?"
      );
    } else {
      try {
        const currentTournamentId = localStorage.getItem("currentTournamentId");
        this.tournament = getTournament(currentTournamentId);
      } catch (e) {
        console.log(e);
      }
    }
  },
});
</script>