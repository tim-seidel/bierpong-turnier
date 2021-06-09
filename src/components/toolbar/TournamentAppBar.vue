<template>
  <v-app-bar color="primary" dark app>
    <v-icon class="mr-2">mdi-trophy-outline</v-icon>
    <router-link to="groupstage">
      <v-toolbar-title class="white--text">
        {{ appTitle }}
      </v-toolbar-title>
    </router-link>
    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn @click="dialogAdd = true" icon disabled>
        <v-icon>mdi-plus-box</v-icon>
      </v-btn>

      <v-btn @click="dialogSettings = true" class="mr-1 ml-1" icon>
        <v-icon>mdi-view-grid</v-icon>
      </v-btn>

      <v-btn @click="dialogSave = true" class="mr-1 ml-1" icon>
        <v-icon>mdi-download-box</v-icon>
      </v-btn>

      <v-btn
        @click="dialogEnd.isVisible = true"
        class="ml-1 mr-1"
        color="error"
        icon
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <v-dialog v-model="dialogAdd" persistent max-width="600">
        <v-card>
          <v-card-text>
            <add-to-tournament :groups="visibleGroups" />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="dialogAdd = false"
              >Schließen</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogSettings" persistent max-width="600">
        <v-card>
          <v-card-text>
            <layout-options :groups="groups" />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogSettings = false"
              >Schließen</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogSave" max-width="400">
        <v-card>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col class="mt-2" cols="12">
                  <h1>Turnier speichern</h1>
                </v-col>
                <v-col cols="12">
                  <a class="save-link" download="tournament.json" :href="fileUrl"
                    >Datei herunterladen</a
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" text @click="dialogSave = false"
              >Schließen</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogEnd.isVisible" max-width="400">
        <v-card>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col class="mt-2 pl-0" cols="12">
                  <h1>Turnier speichern</h1>
                </v-col>
              </v-row>
            </v-container>
            <v-row>
              <v-col cols="12">
                <v-alert type="warning"
                  >Wenn Du jetzt beendest gehen ungespeicherte Änderungen
                  verloren.</v-alert
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <a class="save-link" download="tournament.json" :href="fileUrl">
                  Kopie Speichern</a
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col class="mt-2 pb-0" cols="12">
                <p class="mb-2">
                  Gib zur Sicherheit den Admin-Key zum Löschen ein.
                </p>
              </v-col>
              <v-col class="pt-0 pb-0" cols="12">
                <v-text-field
                  outlined
                  label="delete_key"
                  type="password"
                  v-model="dialogEnd.deleteKey"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" text @click="dialogEnd = false"
              >Abbrechen</v-btn
            >
            <v-btn color="error" text @click="onEndTournament">Beenden</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import Vue from "vue";
import { v4 as uuid } from "uuid";

import AddToTournament from "@/components/dialog/AddToTournament";
import LayoutOptions from "@/components/dialog/LayoutOptions";

import Team from "@/model/Team";
import Game from "@/model/Game";
import {convertTournamentToJson} from "@/model/util/Converter"

export default Vue.extend({
  components: {
    AddToTournament,
    LayoutOptions,
  },
  data: () => {
    return {
      dialogAdd: false,
      dialogEnd: {
        isVisible: false,
        deleteKey: "",
      },
      dialogSave: false,
      dialogSettings: false,
      href: "",
    };
  },
  computed: {
    tournament() {
      return this.$store.getters.currentTournament;
    },
    appTitle() {
      return this.tournament?.name ?? "Nicht geladen";
    },

    visibleGroups() {
      return this.$store.getters.visibleGroups ?? [];
    },

    fileUrl() {
      if (!this.tournament) {
        return "";
      }

      const json = convertTournamentToJson(this.tournament);
      const file = new Blob([JSON.stringify(json)], { type: "text/json" });
      return URL.createObjectURL(file);
    },

    addDialogSelectedGroup() {
      return this.groups.find((g) => g.name === this.dialogAdd.group);
    },

    addDialogGroups() {
      const groups = [];
      if (this.groups) {
        this.groups.forEach((g) => {
          groups.push(g.name);
        });
      }
      return groups;
    },

    addDialogSelectedTeams() {
      const teams = [];
      if (this.addDialogSelectedGroup) {
        this.addDialogSelectedGroup.teams.forEach((t) => {
          teams.push(t.name);
        });
      }
      return teams;
    },

    groups() {
      return this.tournament?.groups ?? [];
    },
  },
  methods: {
    onEndTournament() {
      if (this.dialogEnd.deleteKey === "Ich bin nicht betrunken!") {
        this.dialog = false;
        localStorage.removeItem("currentTournamentId");
        this.$store.state.tournament.current = null;
        this.$router.push("/");
      }
    },

    resetAddDialog() {
      this.dialogAdd.team1 = "";
      this.dialogAdd.team2 = "";
      this.dialogAdd.teamName = "";
      this.dialogAdd.error = "";
    },

    saveTeam() {
      const grp = this.addDialogSelectedGroup;
      if (grp && !grp.hasStarted()) {
        grp.teams.push(new Team(uuid(), this.dialogAdd.teamName));
        grp.createGames();
        this.resetAddDialog();
      } else {
        alert(
          "Angefangene Gruppen können leider keine weiteren Teams hinzufügen."
        );
      }
    },

    saveGame() {
      const grp = this.addDialogSelectedGroup;
      let error = false;
      if (grp) {
        const team1 = grp.teams.find((t) => t.name === this.dialogAdd.team1);
        const team2 = grp.teams.find((t) => t.name === this.dialogAdd.team2);
        if (team1 && team2) {
          grp.games.push(new Game(uuid(), team1, team2));
          grp.calculateStandings();
        } else {
          error = true;
        }
      } else {
        error = true;
      }

      if (error) {
        alert("Fehler beim hinzufügen des Teams. Objekt nicht erkannt");
      } else {
        this.resetAddDialog();
      }
    },
  },
});
</script>

<style scoped>
.save-link {
  border: thin solid steelblue;
  border-radius: 4px;
  align-items: center;
  font-weight: 500;
  letter-spacing: 0.089em;
  display: inline-flex;
  text-transform: uppercase;
  text-decoration: none;
  height: 36px;
  padding: 0 16px;
}

.save-link:hover {
  background-color: lightblue;
}
</style>
