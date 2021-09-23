<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-row align="center" class="pl-6 pr-6">
          <v-btn color="primary" @click="onCreateTournamentClicked">
            <v-icon>mdi-plus</v-icon>
            Neues Turnier
          </v-btn>
          <v-file-input
              class="pl-3"
              accept=".bpt,.json"
              label="Gespeicherte Turnierdatei"
              v-model="tournamentFile"
          >
            <template v-slot:append>
              <v-btn color="primary" @click="loadFile">
                <v-icon>mdi-upload</v-icon>
              </v-btn>
            </template>
          </v-file-input>

          <v-dialog
              v-model="updateDialog"
              persistent
              max-width="500"
          >
            <v-card>
              <v-card-title class="text-h5">
                Turnier überschreiben?
              </v-card-title>
              <v-card-text>Es scheint, dieses Turnier existiert bereits. Möchtest du es mit deiner Speicherdatei
                ÜBERSCHREIBEN?
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="grey darken-1"
                    text
                    @click="updateDialog = false"
                >
                  Abbrechen
                </v-btn>
                <v-btn
                    color="primary darken-1"
                    text
                    @click="onUploadConfirmed"
                >
                  Überschreiben
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-col>
      <v-col cols="12" md="6">
        <tournament-list
            :loading="isLoading"
            title="Kommende Turniere"
            :tournaments="comingTournaments"
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

import {getTournaments, updateTournament} from "../../services/TournamentService";
import {convertJsonToTournament} from "../../util/TournamentConverter";

import moment from "moment";
import {sha256} from "js-sha256";

export default Vue.extend({
  data: () => ({
    tournamentList: [],
    isLoading: false,

    tournamentFile: undefined,
    fileContent: undefined,

    updateDialog: undefined,
    dialogEnd: {
      isVisible: false,
      deleteKey: "",
    }
  }),
  components: {
    TournamentList,
  },
  beforeMount() {
    this.loadTournaments();
  },
  computed: {
    comingTournaments() {
      return this.tournamentList.filter((t) => {
        return moment().isBefore(t.startDate);
      });
    },
    pastTournaments() {
      return this.tournamentList.filter((t) => {
        return moment().isAfter(t.startDate);
      });
    }
  },
  methods: {
    loadTournaments() {
      this.isLoading = true;
      this.tournamentList = getTournaments();
      this.isLoading = false
    },
    onTournamentSelectClicked(item) {
      this.$router.push({
        name: "TournamentOverview",
        params: {tournamentId: item.id},
      });
    },
    onCreateTournamentClicked() {
      this.$router.push({name: "TournamentCreation"});
    },
    createOrUpdateTournamentFromFile() {
      if (!this.fileContent) return
      this.updateDialog = false

      try {
        const json = JSON.parse(this.fileContent)
        const tournament = convertJsonToTournament(json)

        updateTournament(tournament)
        this.loadTournaments()

        this.fileContent = undefined
      } catch (e) {
        alert("Turnier konnte nicht geladen werden.")
        console.log(e)
      }
    },
    loadFile() {
      if (!this.tournamentFile) return

      const reader = new FileReader()

      reader.readAsText(this.tournamentFile)
      reader.onload = () => {
        this.fileContent = reader.result
        this.updateDialog = true

        try {
          const json = JSON.parse(this.fileContent)
          if (this.tournamentList.find(t => t.id === json.id)) {
            this.updateDialog = true
          } else {
            this.createOrUpdateTournamentFromFile()
          }

        } catch (e) {
          alert("Turnier konnte nicht geladen werden.")
          console.log(e)
        }
      }
    },
    async onUploadConfirmed() {
      this.createOrUpdateTournamentFromFile()
    }
  }
});
</script>
