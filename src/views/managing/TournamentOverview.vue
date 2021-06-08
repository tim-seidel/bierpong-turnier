<template>
  <v-container>
    <v-row v-if="!isLoading">
      <v-col cols="12">
        <tournament-information-header-card :tournament="tournament" />
      </v-col>

      <v-col cols="12" md="6">
        <transition name="flip" mode="out-in">
          <general-information-edit-card
            v-if="edit.isEditingGeneralInformation"
            :tournament="tournament"
            @exit="requestGeneralInformationExit"
          />
          <general-information-card
            v-else
            :tournament="tournament"
            @edit="requestGeneralInformationEdit"
          />
        </transition>
      </v-col>

      <v-col cols="12" md="6">
        <transition name="flip" mode="out-in">
          <configuration-edit-card
            v-if="edit.isEditingConfiguration"
            :configuration="configuration"
            @exit="requestConfigurationExit"
          />
          <configuration-information-card
            v-else
            :configuration="configuration"
            @edit="requestConfigurationEdit"
          />
        </transition>
      </v-col>

      <v-col cols="12">
        <groups-information-card :tournament="tournament" />
      </v-col>
    </v-row>

    <v-row v-if="isLoading">
      <v-col cols="12">
        <v-card :loading="isLoading">
          <v-card-title> Lade Turnier... </v-card-title>
          <v-card-subtitle>
            Sobald das Turnier geladen ist werden die Informationen angezeigt :)
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as moment from "moment";
import {
  getConfiguration,
  getTournament,
} from "../../services/TournamentService";

import GeneralInformationCard from "../../components/overview/GeneralInformationCard.vue";
import ConfigurationInformationCard from "../../components/overview/ConfigurationInformationCard.vue";
import ConfigurationEditCard from "../../components/overview/ConfigurationEditCard.vue";
import TournamentInformationHeaderCard from "../../components/overview/TournamentInformationHeaderCard.vue";
import GroupsInformationCard from "../../components/overview/GroupsInformationCard.vue";
import GeneralInformationEditCard from "../../components/overview/GeneralInformationEditCard.vue";

export default {
  components: {
    GeneralInformationCard,
    ConfigurationInformationCard,
    TournamentInformationHeaderCard,
    GroupsInformationCard,
    GeneralInformationEditCard,
    ConfigurationEditCard,
  },
  data: () => ({
    edit: {
      isEditingGeneralInformation: false,
      isEditingConfiguration: false,
    },
    isLoading: false,
    tournament: undefined,
    configuration: undefined,
    shareCode: undefined,
  }),
  async beforeMount() {
    this.isLoading = true;
    const id = this.$route.params.tournamentId;
    if (!id) return;
    this.tournament = await getTournament(id, "__DEV__");
    if (this.tournament && this.tournament.configurationId) {
      this.configuration = await getConfiguration({
        id: this.tournament.configurationId,
        password: "",
      });
    }
    this.isLoading = false;
  },
  methods: {
    requestGeneralInformationEdit() {
      this.edit.isEditingGeneralInformation = true;
    },
    requestGeneralInformationExit() {
      this.edit.isEditingGeneralInformation = false;
    },
    requestConfigurationEdit() {
      this.edit.isEditingConfiguration = true;
    },
    requestConfigurationExit() {
      this.edit.isEditingConfiguration = false;
    },
    formatDate(date) {
      if (!date) return "Unbekannt";
      return moment(date).format("DD.MM.YYYY HH:mm");
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

<style scoped>
.flip-enter-active {
  animation: flip-in 0.3s ease-out;
}
.flip-leave-active {
  animation: flip-out 0.3s ease-out;
}
@keyframes flip-out {
  from {
    transform: scaleY(1);
  }
  to {
    transform: scaleY(0);
  }
}
@keyframes flip-in {
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
}
</style>