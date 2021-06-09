<template>
  <v-card class="fill-height" v-if="!tournament">
    <v-card-title> Turnierübersicht </v-card-title>
    <v-card-text>
      Aktuell stehen keine Turnierinformationen bereit.
    </v-card-text>
  </v-card>

  <v-card class="fill-height" v-else>
    <v-card-title class="mb-2">
      {{ tournament.name }}
      <v-spacer></v-spacer>
      <v-btn class="ml-2" color="error" @click="onDeleteClicked">
        <v-icon>mdi-delete</v-icon>
        LÖschen
      </v-btn>
      <v-btn class="ml-2" color="primary" @click="onSelect"
        >Gruppenphase
        <v-icon right>mdi-send</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-subtitle>
      Hier siehst Du die Übersicht zum aktuellen Turnierstand. Du kannst hier
      Einstellungen vornehmen, oder die Gruppenphase direkt starten.
    </v-card-subtitle>
  </v-card>
</template>

<script>
import * as moment from "moment";
import { deleteTournament } from "../../services/TournamentService";

export default {
  props: {
    tournament: {
      type: Object,
      default: undefined,
    },
  },
  data: () => ({}),
  methods: {
    formatDate(date) {
      if (!date) return "Unbekannt";
      return moment(date).format("DD.MM.YYYY HH:mm");
    },
    onSelect() {
      this.$store.state.tournament.current = this.tournament;
      localStorage.setItem("currentTournamentId", this.tournament?.id);
      this.$router.push({ name: "GroupStage" });
    },
    async onDeleteClicked() {
      deleteTournament(this.tournament.id);

      this.$router.back();
    },
  },
  computed: {},
};
</script>
