<template>
  <v-card class="fill-height" v-if="configuration">
    <v-card-title>
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
      <v-row>
        <v-col cols="6"
          ><p>
            <v-icon class="mr-2" color="primary">mdi-account-group</v-icon>
            Anzahl Gruppen:
          </p></v-col
        >
        <v-col cols="6"
          ><h4>{{ configuration.groupCount }}</h4></v-col
        >
      </v-row>
      <v-row>
        <v-col cols="6"
          ><p>
            <v-icon class="mr-2" color="primary">mdi-account</v-icon>
            Spieler:
          </p></v-col
        >
        <v-col cols="6"
          ><h4>{{ players }}</h4></v-col
        >
      </v-row>
      <v-row>
        <v-col cols="6"
          ><p>
            <v-icon class="mr-2" color="primary">mdi-account-multiple</v-icon>
            Teams:
          </p></v-col
        >
        <v-col cols="6"
          ><h4>{{ teams }}</h4></v-col
        >
      </v-row>
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
    return {};
  },

  methods: {
    onSaveClicked() {
      this.$emit("exit");
    },
    onCancelClicked() {
      this.$emit("exit");
    },
  },
  computed: {
    teams() {
      if (!this.configuration || !this.configuration.teams) return "-/-";
      try {
        const json = JSON.parse(this.configuration.teams);
        return json;
      } catch (error) {
        return this.configuration.teams;
      }
    },
    players() {
      if (!this.configuration || !this.configuration.players) return "-/-";
      try {
        const json = JSON.parse(this.configuration.players);
        return json;
      } catch (error) {
        return this.configuration.players;
      }
    },
  },
};
</script>
