<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="mt-2">
          <v-card-title>
            Erstellung erfolgreich.
            <v-spacer></v-spacer>
            <v-btn color="primary">
              Weiter
              <v-icon class="ml-2">mdi-arrow-right</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-subtitle
            >Hier kannst du noch einmal die Details sehen:</v-card-subtitle
          >
        </v-card>
      </v-col>
      <v-col cols="6">
        <general-settings-card
          :name="tournament ? tournament.name : 'Unbekannt'"
          :startDate="tournament ? tournament.startDate : undefined"
        />
      </v-col>
      <v-col cols="6">
        <advice-card :title="adviceTitle" :advices="advices" />
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title>
            Turnier exportieren:
            <v-spacer></v-spacer>
            <v-btn color="primary"
              ><v-icon class="mr-2" color="white"
                >mdi-cloud-download-outline</v-icon
              >Exportieren</v-btn
            >
          </v-card-title>
          <v-card-text>
            <p>
              <v-icon class="mr-2" color="primary"
                >mdi-arrow-right-circle-outline</v-icon
              >
              Möchtest du das Turnier an einer anderen Stelle einbinden, kannst
              du es hier exportieren.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";

import GeneralSettingsCard from "@/components/manage/GeneralSettingsCard";
import AdviceCard from "@/components/manage/AdviceCard";

export default Vue.extend({
  components: {
    GeneralSettingsCard,
    AdviceCard,
  },
  computed: {
    tournament() {
      return this.$store.getters.currentTournament;
    },
  },
  data: () => {
    return {
      adviceTitle: "So geht es weiter:",
      advices: [
        "Über tournament/manage kannst du das Turnier jederzeit verwalten oder den Stand der Anmeldungen sehen.",
        "Den Link zur Anmeldung kannst du hier kopieren und teilen. Du kannst auch später über die Verwaltungsseite darauf zugreifen.",
        "Wenn alles bereit ist, kannst du das Spiel über die Verwaltungsseite starten!",
      ],
    };
  },
});
</script>