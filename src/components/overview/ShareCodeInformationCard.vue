<template>
  <v-card class="fill-height" v-if="shareCode">
    <v-card-title> ShareCode </v-card-title>
    <v-card-subtitle>
      Mit diesem Code &amp; Link kannst du das Turnier einfach teilen.
    </v-card-subtitle>
    <v-container>
      <v-row>
        <v-col cols="6">
          <p>
            <v-icon class="mr-2" color="primary">mdi-code-json</v-icon>
            Code:
          </p>
        </v-col>
        <v-col cols="6" class="mb-2">
          <h4>
            {{ shareCode.code }}
          </h4>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <p>
            <v-icon class="mr-2" color="primary">mdi-share-variant</v-icon>
            Shortlink:
          </p>
        </v-col>
        <v-col cols="6" class="mb-2">
          <a :href="tournamentLink">{{ tournamentLink }}</a>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <p>
            <v-icon class="mr-2" color="primary">mdi-calendar-check</v-icon>
            Gültig bis:
          </p>
        </v-col>
        <v-col cols="6" class="mb-2">
          <h4>
            {{
              shareCode.validUntil
                ? formatDate(shareCode.validUntil)
                : "Unbegrenzt"
            }}
          </h4>
        </v-col>
      </v-row>
    </v-container>
  </v-card>

  <v-card class="fill-height" v-else>
    <v-card-title>
      ShareCode
      <v-spacer></v-spacer>
      <v-btn color="primary">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-subtitle>
      Mit einem ShareCode kannst du einen Link erstellen und dein Turnier
      einfach teilen.
    </v-card-subtitle>
    <v-container>
      <v-row>
        <v-col cols="12"
          ><p>
            <v-icon class="mr-2" color="primary">mdi-cancel</v-icon>
            Nicht erstellt.
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
    shareCode: {
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
  },
  computed: {
    tournamentLink() {
      return this.shareCode ? "//localhost/r/" + this.shareCode.code : "";
    },
  },
};
</script>
