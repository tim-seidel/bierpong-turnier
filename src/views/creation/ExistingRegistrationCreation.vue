<template>
  <v-container class="pa-0 mt-4">
    <v-row>
      <v-col>
        <p>Hier kannst Du bestehende Anmeldungen von Teams importieren.</p>
        <p>Coming soon (tm)</p>
      </v-col>
    </v-row>

    <v-form
        v-if="false"
      v-model="specialTournamentConfig.isValid"
      ref="registrationCreationForm"
    >
      <v-row>
        <v-col cols="12">
          <p>Hier kannst du weitere Teams hinzufügen:</p>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col class="pt-0" cols="4">
          <p>
            <v-icon class="mr-2" color="primary"
              >mdi-account-supervisor-circle</v-icon
            >
            Teamnamen:
          </p>
        </v-col>
        <v-col cols="8">
          <v-textarea
            v-model.trim="specialTournamentConfig.manualTeams"
            :label="manualTeamLabel"
            placeholder="Mit + Komma, getrennt + oder
neue + Zeile"
            rows="2"
            required
            outlined
            @input="validate"
          ></v-textarea>
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
            :rules="groupCountRules"
            label="Anzahl Gruppen"
            required
            outlined
            @input="validate"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
    <v-row v-if="false">
      <v-col cols="6">
        <v-btn v-if="false"
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
        registeredTeams: [],
        manualTeams: "",
      },
    };
  },
  computed: {
    isValid() {
      return (
        this.tournamentConfig.isValid && this.specialTournamentConfig.isValid
      );
    },
    manualTeamArray() {
      return this.specialTournamentConfig.manualTeams
        .slice()
        .replace(new RegExp("\r?\n", "g"), ",")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    },
    manualTeamCount() {
      return this.manualTeamArray ? this.manualTeamArray.length : 0;
    },
    manualTeamLabel() {
      return (
        "Teamnamen: Aktuell " + this.manualTeamCount + " zusätzliche Teams"
      );
    },
    groupCountRules() {
      return [
        (v) =>
          (v &&
            this.manualTeamCount +
              this.specialTournamentConfig.registeredTeams.length >=
              2 * v) ||
          "Mindestens 2 Teams pro Gruppe (Benötigte Teams: " + 2 * v + ").",
      ];
    },
  },
  methods: {
    validate() {
      this.$refs.registrationCreationForm.validate();
    },
    onStartClicked() {},
    onSaveClicked() {}
  },
};
</script>
