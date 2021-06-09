<template>
  <v-card class="fill-height">
    <v-card-title class="mb-2">
      Basisinformationen
      <v-spacer></v-spacer>
      <v-btn color="error" @click="onCancelClicked">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-btn
        color="primary"
        class="ml-2"
        @click="onSaveClicked"
        :disabled="!tournamentConfig.isValid"
      >
        <v-icon>mdi-check</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-subtitle> Die Basisinformationen zum Turnier. </v-card-subtitle>
    <v-container>
      <v-form v-model="tournamentConfig.isValid">
        <v-row align="center">
          <v-col class="pt-0" cols="4">
            <p>
              <v-icon class="mr-2" color="primary">mdi-trophy</v-icon>
              Turniername:
            </p>
          </v-col>
          <v-col cols="8">
            <v-text-field
              v-model.trim="tournamentConfig.name"
              :rules="tournamentNameRules"
              label="Name des Turniers"
              outlined
              required
            />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col class="pt-0" cols="4">
            <p>
              <v-icon class="mr-2" color="primary">mdi-calendar-clock</v-icon>
              Termin:
            </p>
          </v-col>
          <v-col cols="4">
            <v-menu
              v-model="startDateMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="tournamentConfig.startDate"
                  label="Datum"
                  :rules="startDateRules"
                  outlined
                  readonly
                  required
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="tournamentConfig.startDate"
                @input="startDateMenu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="4">
            <v-menu
              ref="menu"
              v-model="startTimeMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="tournamentConfig.startTime"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="tournamentConfig.startTime"
                  label="Uhrzeit"
                  :rules="startTimeRules"
                  readonly
                  outlined
                  required
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="startTimeMenu"
                v-model="tournamentConfig.startTime"
                format="24hr"
                full-width
                @click:minute="$refs.menu.save(tournamentConfig.startTime)"
              ></v-time-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import { updateTournament } from "../../services/TournamentService";
export default {
  props: {
    tournament: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    const split = this.splitDateTime(this.tournament.startDate);
    return {
      tab: null,
      tournamentConfig: {
        isValid: false,
        name: this.tournament.name,
        startDate: split.date,
        startTime: split.time,
      },
      startDateMenu: false,
      startTimeMenu: false,
      tournamentNameRules: [
        (v) => !!v || "Bitte einen Turniernamen eingeben.",
        (v) => (v && v.length > 2) || "Mindestens 3 Zeichen",
        (v) => (v && v.length <= 64) || "Maximal 64 Zeichen",
      ],
      maxTeamsRules: [
        (v) => !!v || "Bitte einen Wert eingeben.",
        (v) => (v !== undefined && v > 3 && v < 65) || "Wert zwischen 4 und 64",
      ],
      startDateRules: [(v) => !!v || "Bitte ein Datum angeben."],
      startTimeRules: [(v) => !!v || "Bitte eine Uhrzeit angeben."],
    };
  },
  methods: {
    splitDateTime(dt) {
      if (!dt) {
        return { date: null, time: null };
      }
      return { date: dt.format("YYYY-MM-DD"), time: dt.format("HH:mm") };
    },
    onSaveClicked() {
      if (this.tournamentConfig.isValid) {
        this.tournament.name = this.tournamentConfig.name;
        (this.tournament.startDate =
          this.tournamentConfig.startDate +
          " " +
          this.tournamentConfig.startTime +
          ":00"),
          updateTournament(this.tournament);
      }
      this.$emit("exit");
    },
    onCancelClicked() {
      this.$emit("exit");
    },
  },
};
</script>
