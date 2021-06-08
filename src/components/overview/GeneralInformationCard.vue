<template>
  <v-card v-if="tournament" class="fill-height">
    <v-card-title>
      Basisinformationen
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="onEdit">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-subtitle> Die Basisinformationen zum Turnier. </v-card-subtitle>
    <v-container>
       <v-row>
        <v-col cols="6"
          ><p>
            <v-icon class="mr-2" color="primary">mdi-trophy</v-icon>
            Name:
          </p></v-col
        >
        <v-col cols="6" class="mb-2"
          ><h4>
            {{ tournament.name }}
          </h4></v-col
        >
      </v-row>
      <v-row>
        <v-col cols="6"
          ><p>
            <v-icon class="mr-2" color="primary">mdi-calendar-clock</v-icon>
            Termin:
          </p></v-col
        >
        <v-col cols="6" class="mb-2"
          ><h4>
            {{ formatDate(tournament.startDate) }}
          </h4></v-col
        >
      </v-row>
    </v-container>
  </v-card>
  <v-card v-else class="fill-height">
    <v-card-title>
      Basisinformationen
    </v-card-title>
    <v-card-subtitle>
      Aktuell können leider keine Informationen zum Turnier angezeigt werden.
    </v-card-subtitle>
  </v-card>
</template>

<script>
import * as moment from "moment";

export default {
  props: {
    tournament: {
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
    onSelect() {
      this.$store.state.tournament.current = this.tournament;
      this.$router.push({ name: "GroupStage" });
    },
    onEdit() {
      this.$emit("edit");
    },
    teamsToString(teams) {
      if (!teams || teams.length === 0) return "-/-";
      let str = "";
      teams.forEach((t, i) => {
        str += t.name + (i < teams.length - 1 ? ", " : "");
      });
      return str;
    },
  },
  computed: {
    participatingTeamsCount() {
      if (!this.tournament) return 0;
      let count = 0;
      this.tournament.groups.forEach((g) => {
        count += g.teams.length;
      });
      return count;
    },
  },
};
</script>
