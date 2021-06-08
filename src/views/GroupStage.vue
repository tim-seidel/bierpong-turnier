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
  JsonToTournament,
  TournamentToJson,
} from "@/model/util/TournamentSaver";
import { updateGame, updateTeam } from "../services/TournamentService";

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
    restoreTournament(save) {
      if (save) {
        try {
          this.$store.state.tournament.current = JsonToTournament(save);
        } catch (e) {
          console.log(e);
        }
      }
    },

    async onTournamentChanged(change) {
      const json = TournamentToJson(this.tournament);
      localStorage.setItem("tournamentBackup", json);

      switch (change?.type ?? "") {
        case "team_name": {
          const response = await updateTeam({
            tournamentId: this.tournament.id,
            groupId: change.groupId,
            teamId: change.teamId,
            name: change.name,
          });
          console.log(response);
          break;
        }
        case "game_score": {
          const response = await updateGame({
            tournamentId: this.tournament.id,
            groupId: change.groupId,
            gameId: change.gameId,
            score: change.score,
          });
          console.log(response);
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
      const save = localStorage.getItem("tournamentBackup");
      this.restoreTournament(save);
    } else {
      this.onTournamentChanged();
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
