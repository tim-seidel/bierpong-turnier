<template>
  <v-container class="pa-2" fluid>
    <v-row v-if="tournament" class="text-center ma-0" justify="center">
      <template v-for="g in tournament.groups">
        <v-col
          class="pa-2"
          v-if="g.isVisible"
          :key="g.id"
          cols="12"
          :sm="12 / $store.state.layout.groupsPerRow"
        >
          <group-view @changed="onTournamentChanged" :group="g" />
        </v-col>
      </template>
    </v-row>
    <div v-else class="text-center">
      <h3>Kein Turnier geladen.</h3>
      <p>Erstelle jetzt ein Turnier</p>
      <v-btn color="primary" @click="$router.push('/')"
        >Turnier erstellen</v-btn
      >
    </div>
  </v-container>
</template>

<script>
import GroupView from "@/components/Group.vue";

import {
  getTournament,
  updateGame,
  updateTeam,
} from "../services/TournamentService";

export default {
  components: {
    GroupView: GroupView,
  },

  computed: {
    tournament() {
      return this.$store.getters.currentTournament;
    },
  },

  methods: {
    restoreTournament() {
      try {
        const currentTournamentId = localStorage.getItem("currentTournamentId");
        this.$store.state.tournament.current = getTournament(currentTournamentId);
      } catch (e) {
        console.log(e);
      }
    },

    async onTournamentChanged(change) {
      switch (change?.type ?? "") {
        case "team_name": {
          const response = updateTeam(this.tournament, {
            tournamentId: this.tournament.id,
            groupId: change.groupId,
            teamId: change.teamId,
            name: change.name,
          });
          break;
        }
        case "game_score": {
          const response = updateGame(this.tournament, {
            tournamentId: this.tournament.id,
            groupId: change.groupId,
            gameId: change.gameId,
            score: change.score,
          });
          break;
        }
        case "group_name": {
          break;
        }
      }
    },
  },

  mounted() {
    if (!this.tournament) {
      this.restoreTournament();
    }
  },
};
</script>

<style>
.v-data-table th {
  font-size: 20px;
}

.v-data-table td {
  font-size: 18px;
}
</style>
