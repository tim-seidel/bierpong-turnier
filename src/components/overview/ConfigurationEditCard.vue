<template>
  <v-card class="fill-height" v-if="configuration">
    <v-card-title class="mb-2">
      Konfiguration
      <v-spacer></v-spacer>
      <v-btn color="error" @click="onCancelClicked">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-btn color="primary" class="ml-2" @click="onSaveClicked">
        <v-icon>mdi-check</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-subtitle>
      Hier siehst du die aktulle Konfiguration zum Erstellen der Gruppen. Dies
      wird benötigt, wenn das Turnier manuell und nicht mit Anmeldungen
      konfiguriert wird.
    </v-card-subtitle>
    <v-container v-if="configuration">
      <v-form
        v-model="specialTournamentConfig.isValid"
        ref="editConfigForm"
      >
        <v-row>
          <v-col cols="6"
            ><p>
              <v-icon class="mr-2" color="primary">mdi-account-group</v-icon>
              Anzahl Gruppen:
            </p></v-col
          >
          <v-col cols="6">
            <v-text-field
              v-model="specialTournamentConfig.groupCount"
              type="number"
              min="1"
              max="32"
              label="Anzahl Gruppen"
              outlined
              required
              @input="validate"
          /></v-col>
        </v-row>
        <v-row>
          <v-col cols="6"
            ><p>
              <v-icon class="mr-2" color="primary">mdi-account</v-icon>
              Spieler:
            </p></v-col
          >
          <v-col cols="6">
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
          /></v-col>
        </v-row>
        <v-row>
          <v-col cols="6"
            ><p>
              <v-icon class="mr-2" color="primary">mdi-account-multiple</v-icon>
              Teams:
            </p></v-col
          >
          <v-col cols="6"
            >   <v-textarea
            v-model.trim="specialTournamentConfig.teams"
            :label="teamLabel"
            placeholder="Mit + Komma, getrennt + oder
neue + Zeile"
            :rules="teamCountRules"
            required
            outlined
            rows="2"
            @input="validate"
          /></v-col
          >
        </v-row>
      </v-form>
    </v-container>
  </v-card>

  <v-card class="fill-height" v-else>
    <v-card-title>
      Konfiguration
      <v-spacer></v-spacer>
      <v-btn color="primary">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-subtitle>
      Falls das Turnier nicht mit Anmeldungen erstellt werden soll, sondern
      manuell, kannst du die Einstellungen hier festlegen.
    </v-card-subtitle>
    <v-container>
      <v-row>
        <v-col cols="12"
          ><p>
            <v-icon class="mr-2" color="primary">mdi-cancel</v-icon>
            Nicht konfiguriert
          </p></v-col
        >
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    configuration: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    const tstr = ""
    const tms = this.configuration.teams ?? []
    tms.forEach(t => tstr += t.name + "\n")

    const pstr = ""
    const plrs = this.configuration.players ?? []
    plrs.forEach(p => pstr += p.name + "\n")

    return {
      specialTournamentConfig: {
        isValid: true,
        groupCount: 1,
        teamCount: 4,
        players: pstr,
        teams: tstr
      },
    };
  },

  methods: {
    onSaveClicked() {
      this.$emit("exit");
    },
    onCancelClicked() {
      this.$emit("exit");
    },
    validate() {
      this.$refs.editConfigForm.validate();
    },
  },
  computed: {
    teamArray() {
      return this.specialTournamentConfig.teams
        .slice()
        .replace(new RegExp("\r?\n", "g"), ",")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    },
    teamCount() {
      return this.teamArray ? this.teamArray.length : 0;
    },
    teamLabel() {
      return "Teamnamen: Aktuell " + this.teamCount + " Teams";
    },
    teamCountRules() {
      return [
        (v) =>
          (v &&
            this.teamCount >= 2 * this.specialTournamentConfig.groupCount) ||
          "Mindestens 2 Teams pro Gruppe (Benötigte Teams: " +
            2 * this.specialTournamentConfig.groupCount +
            ").",
      ];
    },
  },
};
</script>
