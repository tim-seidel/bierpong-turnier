<template>
  <v-card class="fill-height" v-if="configuration">
    <v-card-title class="mb-2">
      Konfiguration
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="onEdit" disabled>
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-subtitle>
      Hier siehst du die aktulle Konfiguration zum Erstellen der Gruppen. Dies
      wird benötigt, wenn das Turnier manuell und nicht mit Anmeldungen
      konfiguriert wird.
    </v-card-subtitle>
    <v-container v-if="configuration">
      <v-row>
        <v-col cols="6" md="3"
          ><p>
            <v-icon class="mr-2" color="primary">mdi-account-group</v-icon>
            Anzahl Gruppen:
          </p></v-col
        >
        <v-col cols="6" md="3"
          ><h4>
            {{
              configuration.groupCount
                ? configuration.groupCount
                : "Nicht eingestellt"
            }}
          </h4>
        </v-col>
        <v-col cols="6" md="3"
          ><p>
            <v-icon class="mr-2" color="primary">mdi-account-multiple</v-icon>
            Anzahl Teams:
          </p></v-col
        >
        <v-col cols="6" md="3"
          ><h4 v-if="configuration.teamCount">
            {{ configuration.teamCount }}
          </h4>
          <p v-else>Nicht eingestellt</p></v-col
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
          ><h4 v-if="configuration.players && configuration.players.length > 0">
            {{ configuration.players }}
          </h4>
          <p v-else>Nicht eingestellt</p></v-col
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
          ><h4 v-if="configuration.teams && configuration.teams.length > 0">
            {{ configuration.teams }}
          </h4>
          <p v-else>Nicht eingestellt</p></v-col
        >
      </v-row>
    </v-container>
  </v-card>

  <v-card class="fill-height" v-else>
    <v-card-title>
      Konfiguration
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="onAdd" disabled>
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
import * as moment from "moment";

export default {
  props: {
    configuration: {
      type: Object,
      default: undefined,
    },
  },
  data: () => ({}),

  methods: {
    formatDate(date) {
      if (!date) return "Unbekannt";
      return moment(date).format("DD.MM.YYYY HH:mm");
    },
    onAdd() {
      this.$emit("edit");
    },
    onEdit() {
      this.$emit("edit");
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
