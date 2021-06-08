<template>
  <v-card class="fill-height" v-if="tournament">
    <v-card-title>
      Gruppen
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="onEdit" :disabled="true">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-card-title>
    <v-container>
      <v-row>
        <v-col cols="12"
          ><p>
            <v-icon class="mr-2" color="primary">mdi-account-group</v-icon>
            {{ tournament.groups.length }} Gruppen:
          </p></v-col
        >
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
          v-for="group in tournament.groups"
          :key="group.id"
        >
          <v-row>
            <v-col cols="12">
              <h3>{{group.name}}</h3>
            </v-col>
          
            <v-col cols="6">
              <v-row>
                <v-col cols="12">
                  <v-icon class="mr-2" color="primary"
                    >mdi-account-multiple</v-icon
                  >
                  <strong>Teams</strong>
                </v-col>
              </v-row>
              <v-row v-for="team in group.teams" :key="team.id">
                <v-col cols="12">{{ team.name }}</v-col>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-row>
                <v-col cols="12">
                  <v-icon class="mr-2" color="primary"
                    >mdi-glass-mug-variant</v-icon
                  >
                  <strong>Spiele</strong>
                </v-col>
              </v-row>
              <v-row v-for="game in group.games" :key="game.id">
                <v-col cols="6">{{
                  game.team1.name + " - " + game.team2.name
                }}</v-col>
                <v-col cols="6">{{
                  (game.score.beers1 !== undefined ? game.score.beers1 : "-") +
                  " : " +
                  (game.score.beers2 !== undefined ? game.score.beers2 : "-")
                }}</v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  <v-card class="fill-height" v-else>
    <v-card-title> Gruppen </v-card-title>
    <v-card-subtitle>
      Akutell können leider keine Informationen zu den Gruppen angezeigt werden.
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
  data: () => ({
    divider: {
      background: "black",
      height: "1px",
    },
  }),
  methods: {
    formatDate(date) {
      if (!date) return "Unbekannt";
      return moment(date).format("DD.MM.YYYY HH:mm");
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
  computed: {},
};
</script>
