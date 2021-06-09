<template>
  <v-container class="mt-4 pa-0">
    <v-form v-model="specialTournamentConfig.isValid" ref="manualCreationForm">
      <v-row>
        <v-col cols="12">
          <p>
            Die Teamnamen können nach dem Erstellen geändert und zugeordnet
            werden.
          </p>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col class="pt-0" cols="4">
          <p>
            <v-icon class="mr-2" color="primary">mdi-account-group</v-icon>
            Anzahl der Gruppen:
          </p>
        </v-col>
        <v-col cols="8">
          <v-text-field
            v-model="specialTournamentConfig.groupCount"
            type="number"
            min="1"
            max="32"
            label="Anzahl Gruppen"
            outlined
            required
            @input="validate"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col class="pt-0" cols="4">
          <p>
            <v-icon class="mr-2" color="primary"
              >mdi-account-supervisor-circle</v-icon
            >
            Anzahl der Teams:
          </p>
        </v-col>
        <v-col cols="8">
          <v-text-field
            v-model="specialTournamentConfig.teamCount"
            type="number"
            min="2"
            max="192"
            label="Anzahl aller Teams"
            :rules="teamCountRules"
            outlined
            required
            @input="validate"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
    <v-row>
      <v-col cols="6">
        <v-btn
          v-if="false"
          color="primary"
          block
          @click="onSaveClicked"
          :disabled="!tournamentConfig.isValid"
        >
          <v-icon class="mr-2">mdi-content-save</v-icon> Speichern</v-btn
        >
      </v-col>
      <v-col cols="6">
        <v-btn
          color="primary"
          block
          @click="onStartClicked"
          :disabled="!isValid"
        >
          Starten <v-icon class="ml-2">mdi-arrow-right-circle-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { createTournament } from "../../services/TournamentService";

export default {
  props: {
    tournamentConfig: {
      type: Object,
      default() {
        return {
          isValid: true,
        };
      },
    },
  },
  data: () => {
    return {
      specialTournamentConfig: {
        isValid: true,
        groupCount: 1,
        teamCount: 4,
      },
    };
  },
  computed: {
    isValid() {
      return (
        this.tournamentConfig.isValid && this.specialTournamentConfig.isValid
      );
    },
    teamCountRules() {
      return [
        (v) =>
          (v && v >= this.specialTournamentConfig.groupCount * 2) ||
          "Zu wenig Teams für die aktuellen Einstellungen (mindestens 2 Teams pro Gruppe)",
      ];
    },
  },
  methods: {
    validate() {
      this.$refs.manualCreationForm.validate();
    },
    async onStartClicked() {
      const config = {
        type: "manual",
        name: this.tournamentConfig.name,
        startDate:
          this.tournamentConfig.startDate +
          " " +
          this.tournamentConfig.startTime +
          ":00",
        groupCount: this.specialTournamentConfig.groupCount,
        teamCount: this.specialTournamentConfig.teamCount,
      };

      const tournament = createTournament(config);

      this.$store.state.tournament.current = tournament;
      localStorage.setItem("currentTournamentId", tournament?.id);
      this.$router.push({ name: "GroupStage" });
    },
  },
};
</script>
