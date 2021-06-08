<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <tournament-list
          :loading="isLoading"
          title="Kommende Turniere"
          :tournaments="commingTournaments"
          @select="onTournamentSelectClicked"
        ></tournament-list>
      </v-col>
      <v-col cols="12" md="6">
        <tournament-list
          :loading="isLoading"
          title="Vergangene Turniere"
          :tournaments="pastTournaments"
          @select="onTournamentSelectClicked"
        ></tournament-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";

import TournamentList from "@/components/TournamentList";

import { getTournaments } from "../../services/TournamentService";
import moment from "moment";

export default Vue.extend({
  data: () => ({
    tournamentList: [],
    isLoading: false,
  }),
  components: {
    TournamentList,
  },
  beforeMount() {
    this.loadTournaments();
  },
  methods: {
    async loadTournaments() {
      this.isLoading = true;
      this.tournamentList = getTournaments();
      this.isLoading = false;
    },
    async onTournamentSelectClicked(item) {
      this.$router.push({
        name: "TournamentOverview",
        params: { tournamentId: item.id },
      });
    },
  },
  computed: {
    commingTournaments() {
      return this.tournamentList.filter((t) => {
        return moment().isBefore(t.startDate);
      });
    },
    pastTournaments() {
      return this.tournamentList.filter((t) => {
        return moment().isAfter(t.startDate);
      });
    },
  },
});
</script>
