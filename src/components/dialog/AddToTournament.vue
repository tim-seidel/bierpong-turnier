<template>
  <v-container fluid>
    <v-row>
      <v-col class="mt-2 mb-2" cols="12">
        <h1>Teams und Spiele hinzufügen</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <h2>Gruppe auswählen</h2>
      </v-col>
      <v-col cols="12">
        <v-select
            label="Gruppe"
            :items="groups"
            item-text="name"
            @change="resetInput"
            return-object
            v-model="group"
            outlined
        />
      </v-col>
    </v-row>

    <div v-if="group">
      <v-row v-if="group.hasStarted()">
        <v-col cols="12">
          <h2>Team hinzufügen/löschen</h2>
        </v-col>
        <v-col class="pt-0" cols="12">
          <v-alert type="warning"
          >Teams können nur hinzugefügt oder gelöscht werden, wenn keine Spiele in der
            Gruppe gespielt wurden.
          </v-alert>
        </v-col>
      </v-row>

      <v-row v-if="!group.hasStarted()">
        <v-col cols="12">
          <h2>Team hinzufügen</h2>
        </v-col>
        <v-col v-if="group.teams.length >= 6" class="pt-0" cols="12">
          <v-alert type="warning"
          >Eine Gruppe kann maximal aus 6 Teams bestehen
          </v-alert>
        </v-col>
        <v-col v-else class="pt-0" cols="12">
          <v-text-field v-model="name" label="Teamname" outlined>
            <template v-slot:append-outer>
              <v-btn
                  color="primary"
                  @click="saveTeam"
                  :disabled="!isSaveTeamEnabled"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-col>
      </v-row>

      <v-row v-if="!group.hasStarted()">
        <v-col cols="12">
          <h2>Team löschen</h2>
        </v-col>
        <v-col class="pt-0" cols="12">
          <v-select
              label="Team auswählen"
              :items="teams"
              :item-text="teamText"
              return-object
              v-model="teamToDelete"
              outlined
          >
            <template v-slot:append-outer>
              <v-btn
                  color="error"
                  @click="deleteTeam"
                  :disabled="!group || !teamToDelete"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="mt-4" cols="12">
          <h2>Spiel hinzufügen</h2>
        </v-col>
        <v-col class="pt-0" cols="12" sm="6">
          <v-select
              label="Team 1"
              :items="teams"
              item-text="name"
              return-object
              v-model="team1"
              outlined
          />
        </v-col>
        <v-col class="pt-0" cols="12" sm="6">
          <v-select
              label="Team 2"
              :items="teams"
              item-text="name"
              return-object
              v-model="team2"
              outlined
          >
            <template v-slot:append-outer>
              <v-btn
                  color="primary"
                  @click="saveGame"
                  :disabled="!isSaveGameEnabled"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
          </v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <h2>Spiel löschen</h2>
        </v-col>
        <v-col class="pb-0 pt-0" cols="12">
          <v-alert type="info"
          >Es können nur ungespielte Spiele gelöscht werden.
          </v-alert
          >
        </v-col>
        <v-col class="pt-0" cols="12">
          <v-select
              label="Spiel auswählen"
              :items="games"
              :item-text="gameText"
              return-object
              v-model="gameToDelete"
              outlined
          >
            <template v-slot:append-outer>
              <v-btn
                  color="error"
                  @click="deleteGame"
                  :disabled="!group || !gameToDelete"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-select>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import Team from "@/model/Team";
import Game from "@/model/Game";
import Score from "@/model/Score";

import {v4 as uuid} from "uuid";
import {updateTournament} from "../../services/TournamentService";
import {createGames} from "../../util/GameCreator";

export default {
  name: "AddToTournament",
  props: {
    groups: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data: () => ({
    name: "",
    group: undefined,
    team1: undefined,
    team2: undefined,
    gameToDelete: undefined,
    teamToDelete: undefined
  }),
  computed: {
    teams() {
      return this.group?.teams ?? [];
    },
    games() {
      const games = [];
      if (this.group) {
        this.group.games.forEach((g) => {
          if (!g.score.isValid()) {
            games.push(g);
          }
        });
      }
      return games;
    },
    isSaveTeamEnabled() {
      return this.group && this.name.length > 2 && !this.group.hasStarted();
    },
    isSaveGameEnabled() {
      return (
          this.group && this.team1 && this.team2 && this.team1 !== this.team2
      );
    },
  },
  methods: {
    gameText(game) {
      return game.asString();
    },
    teamText(team) {
      return team.name
    },
    saveChangesAndResetInput() {
      updateTournament(this.$store.getters.currentTournament)
      this.resetInput();
    },
    resetInput() {
      this.name = "";
      this.team1 = undefined;
      this.team2 = undefined;
      this.gameToDelete = undefined;
      this.teamToDelete = undefined;
    },
    saveTeam() {
      if (!this.group) return;

      const team = new Team(uuid(), this.name);
      this.group.teams.push(team);

      const games = createGames(this.group);
      this.group.games = games;

      this.saveChangesAndResetInput();
    },
    deleteTeam() {
      if (!this.group || !this.teamToDelete) {
        return;
      }

      this.group.teams.splice(this.group.teams.indexOf(this.teamToDelete), 1);
      const games = createGames(this.group);
      this.group.games = games;

      this.saveChangesAndResetInput();
    },
    saveGame() {
      if (!this.group) return;

      const game = new Game(uuid(), this.team1, this.team2, new Score());
      game.order = this.group.games[this.group.games.length - 1] + 1;
      this.group.games.push(game);

      this.saveChangesAndResetInput();
    },
    deleteGame() {
      if (!this.group || !this.gameToDelete) {
        return;
      }

      this.group.games.splice(this.group.games.indexOf(this.gameToDelete), 1);

      this.saveChangesAndResetInput();
    },
  },
};
</script>

<style scoped>
.divider {
  width: 100%;
  height: 1px;
  background-color: gray;
}
</style>
