<template>
  <v-container fluid>
    <v-card align="center" elevation="0">
      <v-card-text align="center">
        <v-img
            style="max-width: 900px"
            v-if="currentPage === 0"
            class="mb-4"
            :src="require('../assets/logo_small.png')"
            contain
        />
        <v-col cols="12" lg="10" v-else-if="currentPage === 1">
          <h1>
            Regeln - Turnierablauf
          </h1>
          <ul class="rules mt-4 mb-6 elevation-4 pa-6 pl-10">
            <li>Ein Spiel dauert maximal 30 Minuten. Zu Beginn startet einer der 4 SpielerInnen eine
              Stoppuhr
            </li>
            <li>Vor Beginn wird entschieden welches Team anfängt, ggf. eine Runde Schere/Stein/Papier, wobei der
              Gewinner entscheiden darf
            </li>
            <li>Welches Team nicht anfängt hat den Nachwurf: Wenn das andere Team beendet (es darf auch versuchen den 2.
              Ball noch in den letzten Becher zu werfen) dürfen noch 2 Bälle geworfen werden um einen Ausgleich zu
              erzielen oder zu gewinnen
            </li>
            <li>Jedes Team bekommt 10 eigene Becher die sie für all ihre Spiele nutzen, die dann mit 3x0,33
              Radler/Bieflaschen gefüllt werden
            </li>
            <li>Bei Spielende werden die verbliebenen Becher als schlechte Punkte notiert</li>
            <li>Die verbliebenen Becher vom Siegerteam werden in die vom Verliererteam umgefüllt und von denen
              getrunken
            </li>
            <li>Spiele können in der Gruppe der Vorrunde unter Abstimmung aller betroffenen Anwesenden in der
              Reihenfolge getauscht werden
            </li>
            <li>Bei Unklarheiten oder vorher nicht festgelegten Situationen entscheiden Obo oder Tims</li>
          </ul>
        </v-col>

        <v-col cols="12" lg="10" v-else-if="currentPage === 2">
          <h1>
            Regeln - Spielablauf
          </h1>
          <ul class="rules mt-4 mb-6 elevation-4 pa-6 pl-10">
            <li>Der Ellenbogen darf beim Wurf nicht die Tischkante überschreiten, man darf sich in verlängerter Linie
              der Wurfkante auch links und rechts vom Tisch hin stellen und werfen
            </li>
            <li>Setzt der Ball auf dem Tisch auf, darf er weggeschlagen werden</li>
            <li>Trifft ein aufgesetzter Ball müssen 2 Becher weggestellt werden. Dies gilbt auch, wenn der Ball erst
              einen Becher oder eine Person trifft, dann auf dem Tisch aufkommt und dann in einen Becher fällt
            </li>
            <li>Treffen 2 Bälle in einen Becher müssen 3 Becher weggestellt werden</li>
            <li>Bälle dürfen nicht aus den Bechern gepustet o.ä. werden</li>
            <li>Wenn eigene Becher umgestoßen/o.ä. werden zählen die als getroffen und werden weg gestellt</li>
            <li>Wird ein Becher von außen getroffen und vom Tisch gestoßen wird er aufgefüllt, von innen zählt als
              getroffen
            </li>
            <li>Rollt der Ball auf dem Tisch zurück, darf der ab der Mitte gegriffen und erneut geworfen werden. Das
              Wurf-Team darf den zurückrollenden Ball über die Komplette Tischfläche hinweg weg schlagen/ greifen und so
              einen erneuten Wurf verhindern. Es sind keine Trickshots nötig
            </li>
            <li>Nach einem Treffer darf man bei 6/4/3 Bechern 2x/Spiel diese als Pyramide/Raute
              zusammenstellen lassen. Die Becher werden dann in der Mitte des Aufbaudreiecks platziert. Die Ansage geht
              jeweils nur nach einem eigenen Treffer.
            </li>
            <li>Keine Schmetterwürfe!</li>
          </ul>
        </v-col>

        <p>Du kannst neue Tuniere auf Basis von Gruppen, Teams oder Spielern erstellen.<br> In der Turnierverwaltung
          kannst du erstellte Turniere starten/fortsetzen oder Speicherdateien laden. </p>

        <v-row style="max-width: 900px">
          <v-col cols="12" sm="6">
            <v-btn
                color="primary"
                block
                @click="$router.push({ name: 'TournamentCreation' })"
            >
              <v-icon class="mr-2">mdi-plus</v-icon>
              Turnier erstellen
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6">
            <v-btn
                block
                color="primary"
                @click="$router.push({ name: 'ManagingLanding' })"
            >
              <v-icon class="mr-2">mdi-clipboard-edit</v-icon>
              Turnierverwaltung
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="primary white--text" primary-title
          >Laufendes Turnier fortfahren?
          </v-card-title
          >
          <v-card-text class="black--text mt-4">{{ message }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red lighten-2" text @click="dismissTournament"
            >Zurücksetzen
            </v-btn
            >
            <v-btn color="primary" text @click="loadTournament"
            >Fortsetzen
            </v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
import Vue from "vue";

import TeamChip from "@/components/TeamChip";

import {getTournament} from "../services/TournamentService";

export default Vue.extend({
  components: {
    TeamChip,
  },
  data: () => {
    return {
      cycleInterval: undefined,
      dialog: false,
      message: "",
      tournament: null,
      currentPage: 2
    };
  },

  methods: {
    cycleNext() {
      this.currentPage = (this.currentPage + 1) % 3
    },
    showDialog(message) {
      this.message = message;
      this.dialog = true;
    },
    loadTournament() {
      this.dialog = false;
      this.$store.state.tournament.current = this.tournament;
      localStorage.setItem("currentTournamentId", this.tournament?.id);
      this.$router.push("groupstage");
    },
    dismissTournament() {
      this.dialog = false;
      this.tournament = null;
      this.$store.state.tournament.current = null;
      localStorage.removeItem("currentTournamentId");
    },
  },
  created() {
    this.cycleInterval = setInterval(this.cycleNext, 20 * 1000)
  },
  beforeMount() {
    if (this.$store.getters.tournament != null) {
      this.tournament = this.$store.getters.tournament;
      this.showDialog(
          "Du hast akutell ein Turnier geladen, möchtest du damit fortfahren?"
      );
    } else {
      try {
        const currentTournamentId = localStorage.getItem("currentTournamentId");
        this.tournament = getTournament(currentTournamentId);
      } catch (e) {
        console.log(e);
      }
    }
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = undefined
    }
  }
});
</script>

<style>
.rules {
  text-align: start;
}

li {
  padding-top: 8px;
  padding-bottom: 8px;
  line-height: 115%;
  font-size: 18pt;
}
</style>
