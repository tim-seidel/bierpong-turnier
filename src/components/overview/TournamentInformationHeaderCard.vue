<template>
  <v-card class="fill-height" v-if="!tournament">
    <v-card-title> Turnierübersicht</v-card-title>
    <v-card-text>
      Aktuell stehen keine Turnierinformationen bereit.
    </v-card-text>
  </v-card>

  <v-card class="fill-height" v-else>
    <v-card-title class="mb-2">
      {{ tournament.name }}
      <v-spacer></v-spacer>
      <v-btn class="ml-2" color="error" @click="dialogDelete.isVisible = true">
        <v-icon>mdi-delete</v-icon>
        Löschen
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

    <v-dialog v-model="dialogDelete.isVisible" max-width="600">
      <v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col class="mt-2 pl-0" cols="12">
                <h1>Turnier wirklich löschen?</h1>
              </v-col>
            </v-row>
          </v-container>
          <v-row>
            <v-col cols="12">
              <v-alert type="warning"
              >Das Turnier kann dann nicht wiederhergestellt werden, außer du hast eine Speicherdatei!
              </v-alert>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <a class="save-link" :download="fileName" :href="fileUrl">
                Kopie Speichern</a>
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
                  v-model="dialogDelete.deleteKey"/>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="primary" text @click="dialogDelete.isVisible = false">Abbrechen</v-btn>
          <v-btn color="error" text @click="onDeleteTournament">Löschen</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import * as moment from "moment";
import {deleteTournament} from "../../services/TournamentService";
import {sha256} from "js-sha256";
import {convertJsonToTournament} from "../../util/Converter";

export default {
  props: {
    tournament: {
      type: Object,
      default: undefined,
    },
  },
  data: () => ({
    dialogDelete: {
      isVisible: false,
      deleteKey: "",
    }
  }),
  methods: {
    formatDate(date) {
      if (!date) return "Unbekannt";
      return moment(date).format("DD.MM.YYYY HH:mm");
    },
    onSelect() {
      this.$store.state.tournament.current = this.tournament;
      localStorage.setItem("currentTournamentId", this.tournament?.id);
      this.$router.push({name: "GroupStage"});
    },
    async onDeleteTournament() {
      const salt = "Bierpong: "
      const compareKey = "c4b6dbb0456345c48e71aa8735d29985699dccce0fe6460f4203c80b19207e6a"
      const enteredKey = sha256(salt + this.dialogDelete.deleteKey)

      if (enteredKey === compareKey) {
        this.dialogDelete.isVisible = false;
        deleteTournament(this.tournament.id);
        this.$router.back();
      }
    },
    fileUrl() {
      if (!this.tournament) {
        return "";
      }

      const json = convertJsonToTournament(this.tournament);
      const file = new Blob([JSON.stringify(json)], {type: "text/json"});
      return URL.createObjectURL(file);
    },
    fileName() {
      return this.appTitle + ".json"
    }
  }
};
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
