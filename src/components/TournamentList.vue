<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" class="pb-0 pt-0">
        <h2 class="mt-3">{{ title }}</h2>
      </v-col>
      <v-col cols="12" md="6" class="pb-0 pt-0">
        <v-text-field
          v-model="search"
          label="Suchen"
          prepend-inner-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="filteredTournaments.length > 0">
      <v-col :cols="12 / rows" v-for="t in filteredTournaments" :key="t.id">
        <tournament-list-view-item
          :name="t.name"
          :startDate="t.startDate"
          :teamCount="t.teamCount"
          @select="onTournamentClicked(t)"
        />
      </v-col>
    </v-row>
    <v-row v-else-if="filteredTournaments.length === 0 && !search">
      <v-col :cols="12 / rows">
        <v-card :loading="loading">
          <v-container>
            <v-row>
              <v-col cols="12">
                <p v-if="loading">Lade Turniere...</p>
                <p v-else>Keine Turniere gefunden.</p>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else-if="filteredTournaments.length === 0 && search">
      <v-col :cols="12 / rows">
        <v-card>
          <v-container>
            <v-row>
              <v-col cols="12">
                <p>Keine Turniere mit dem aktuellen Filter gefunden.</p>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TournamentListViewItem from "./TournamentListViewItem";

export default {
  components: {
    TournamentListViewItem,
  },
  props: {
    tournaments: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: "Turniere",
    },
    rows: {
      type: [Number, String],
      default: 1,
    },
    loading: {
      type: Boolean,
      defualt: false,
    },
  },
  data: () => {
    return {
      search: "",
    };
  },
  methods: {
    onTournamentClicked(tournament) {
      this.$emit("select", tournament);
    },
  },
  computed: {
    filteredTournaments() {
      if (!this.search) {
        return this.tournaments;
      } else {
        const s = this.search.trim().toLowerCase();
        return this.tournaments.filter(
          (t) =>
            t.name.toLowerCase().includes(s)
        );
      }
    },
  },
};
</script>
