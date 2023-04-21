<template>
  <v-container fluid>
    <v-card align="center" elevation="0">
      <v-card-text align="center">
        <v-col cols="12" md="9" xl="6" v-if="currentPage === 0">
          <v-img
              class="mb-4"
              :src="require('../assets/logo_small.png')"
              contain
          />
          <p>In der Toolbar kannst du über <span class="font-italic">Erstellen</span> neue Turniere auf Basis von
            Gruppen, Teams oder Spielern erstellen.<br> In der Turnierverwaltung über <span class="font-italic">Verwalten/Laden</span>
            lassen sich erstellte Turniere starten, fortsetzen oder Speicherdateien laden. </p>
        </v-col>

        <v-col cols="12" lg="9" v-else-if="currentPage === 1">
          <h1>
            Regeln I - Turnierablauf
          </h1>
          <ul class="rules mt-6 mb-6 elevation-4 pa-6 pl-10">
            <li>Ein Spiel dauert maximal <strong>30 Minuten</strong>. Zu Beginn startet einer der 4 Mitspielenden eine
              Stoppuhr
            </li>
            <li>Vor Beginn wird festgelegt <strong>welches Team anfängt</strong> (ggf. eine Runde Schere/Stein/Papier, das Gewinnerteam darf entscheiden)
            </li>
            <li>Das andere Team hat den <strong>Nachwurf</strong>: Wenn das Beginnerteam beendet (es darf
              versuchen auch den 2. Ball in den letzten Becher zu werfen) dürfen vom Nachwurfteam 2 Bälle geworfen werden um
              einen Ausgleich zu erzielen oder zu gewinnen
            </li>
            <li>Jedes Team füllt die Becher mit
              <strong>3x0,33
                Radler/Bier</strong>
            </li>
            <li>Bei Spielende werden die <strong>verbliebenen Becher als schlechte Punkte notiert </strong></li>
            <li>
              In einer Gruppe können <strong>Spiele</strong> unter Abstimmung aller betroffenen Anwesenden in
              der
              <strong>Reihenfolge getauscht</strong> werden
            </li>
            <li>Bei <strong>Unklarheiten</strong> oder vorher nicht festgelegten Situationen entscheiden Obo oder Tims
            </li>
          </ul>
        </v-col>

        <v-col cols="12" lg="9" v-else-if="currentPage === 2">
          <h1>
            Regeln II - Spielablauf
          </h1>
          <ul class="rules mt-6 mb-6 elevation-4 pa-6 pl-10">
              <li>Der <strong>Ellenbogen</strong> darf <strong>die Tischkante</strong> beim Wurf<strong> nicht überschreiten</strong>. Würfe in verlängerter Line der Wurfkante links und rechts vom Tisch sind erlaubt
            </li>
              <li><strong>Setzt der Ball auf den Tisch</strong> auf, darf er <strong>weggeschlagen</strong> werden. Ein
                  Ball der auf eine <strong>Becherkante</strong> trifft und hochspringt <strong>darf nicht
                  weggeschlagen/</strong>gefangen werden
              </li>
              <li><strong>Trifft ein aufgesetzter Ball</strong> müssen 2 Becher weggestellt werden. Dies gilt auch, wenn
              der Ball erst
              einen Becher oder eine Person trifft, dann auf dem Tisch aufkommt und dann in einen Becher fällt
            </li>
            <li>Treffen <strong>2 Bälle in einen Becher</strong> müssen 3 Becher weggestellt werden</li>
            <li>Bälle dürfen <strong>nicht</strong> aus den Bechern <strong>gepustet</strong> o.ä. werden</li>
            <li>Wenn <strong>eigene Becher umgestoßen</strong> werden, zählen diese als getroffen und werden
              weggestellt
            </li>
            <li>Wird ein Becher <strong>von außen getroffen</strong>, sodass er um- oder vom Tisch fällt, wird er
              wieder hingestellt und aufgefüllt. <strong>Von
                innen
              </strong> zählt als getroffen
            </li>
            <li><strong>Rollt der Ball</strong> auf dem Tisch <strong>zurück</strong>, darf der ab der Mitte gegriffen
              und erneut geworfen werden. Das gegnerische Team darf den zurückrollenden Ball über die komplette
              Tischfläche hinweg wegschlagen/greifen und so einen erneuten Wurf verhindern. Es sind <strong>keine
                Trickshots nötig</strong>
            </li>
            <li>Nach einem Treffer darf man bei <strong>6/4/3 Bechern 2x/Spiel</strong> diese als Pyramide/Raute
              <strong>zusammenstellen</strong> lassen. Die Becher werden dann in der Mitte des Aufbaudreiecks platziert.
              Die Ansage geht
              jeweils nur <strong>nach einem eigenen Treffer</strong>
            </li>
            <li><strong>Keine Schmetterwürfe</strong>!</li>
          </ul>
        </v-col>
        <v-col cols="12" lg="9" v-else-if="currentPage === 3">
          <h1>
            Regeln III - K.O. Phase
          </h1>
          <ul class="rules mt-6 mb-6 elevation-4 pa-6 pl-10">
            <li>[Anzahl/Art der K.O. Teams]</li>
            <li>[Anzahl/Art der ausscheidenen Teams]</li>
            <li>[Spezielle Direktqulifikationsregeln]
            <li>[Spezielle Ausspielregeln]</li>
            <li>Danach geht es im normalen K.O.-Format weiter</li>
            <li>Die 30-Minuten-Regel gilt weiterhin</li>
            <li>Bei Unentschieden oder Ausgleich durch Nachwurf wird jeweils auf einen Becher nach dem Prinzip eines
              Elfmeterschießens geworfen
            </li>
          </ul>
        </v-col>
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
      currentPage: 0
    };
  },

  methods: {
    cycleNext() {
      this.currentPage = (this.currentPage + 1) % 4
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
          "Du hast aktuell ein Turnier geladen, möchtest du damit fortfahren?"
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
  font-size: 19pt;
}
</style>
