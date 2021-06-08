<template>
  <v-container class="mt-4 pa-0">
    <v-form v-model="specialTournamentConfig.isValid" ref="playerCreationForm">
      <v-row>
        <v-col cols="12">
          <p>
            Die Spieler*innen werden zufällig in 2er-Teams und in die Anzahl der
            angegebenen Gruppen eingeteilt.
          </p>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col class="pt-0" cols="4">
          <p>
            <v-icon class="mr-2" color="primary">mdi-account-group</v-icon>
            Gruppenanzahl:
          </p>
        </v-col>
        <v-col cols="8">
          <v-text-field
            v-model="specialTournamentConfig.groupCount"
            type="number"
            min="1"
            max="32"
            label="Anzahl Gruppen"
            required
            outlined
            @input="validate"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col class="pt-0" cols="4">
          <p>
            <v-icon class="mr-2" color="primary">mdi-account</v-icon>
            Spielernamen:
          </p>
        </v-col>
        <v-col cols="8">
          <v-textarea
            v-model.trim="specialTournamentConfig.players"
            :label="playerLabel"
            placeholder="Mit, Komma, getrennt
oder neue Zeile"
            :rules="playerCountRules"
            required
            outlined
            rows="4"
            @input="validate"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-form>
    <v-row>
      <v-col cols="6">
        <v-btn
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
        isValid: false,
        groupCount: 1,
        players: "",
      },
    };
  },
  computed: {
    isValid() {
      return (
        this.tournamentConfig.isValid && this.specialTournamentConfig.isValid
      );
    },
    playerArray() {
      return this.specialTournamentConfig.players
        .slice()
        .replace(new RegExp("\r?\n", "g"), ",")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    },

    playerCount() {
      return this.playerArray ? this.playerArray.length : 0;
    },

    playerLabel() {
      return "Spielernamen: Aktuell " + this.playerCount + " Spieler";
    },
    playerCountRules() {
      return [
        (v) =>
          (v &&
            this.playerCount >= 4 * this.specialTournamentConfig.groupCount) ||
          "Mindestens 4 Spieler pro Gruppe (Benötigte Spieler: " +
            4 * this.specialTournamentConfig.groupCount +
            ").",
      ];
    },
  },

  methods: {
    validate() {
      this.$refs.playerCreationForm.validate();
    },
    onSaveClicked() {},
    async onStartClicked() {
      const config = {
        type: "player",
        name: this.tournamentConfig.name,
        startDate: this.tournamentConfig.startDate + " " + this.tournamentConfig.startTime + ":00",
        groupCount: this.specialTournamentConfig.groupCount,
        players: this.playerArray,
      };

      const response = await createTournament(config);

      this.$store.state.tournament.current = tournament;

      this.$router.push({ name: "GroupStage" });
    },
  },
};
</script>
