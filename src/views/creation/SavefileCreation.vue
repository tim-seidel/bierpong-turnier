<template>
  <v-container class="mt-4 pt-0 pb-0 pl-2 pr-2">
    <v-row>
      <v-col>
        <p>Hier kannst Du eine .beer Datei importieren.</p>
        <v-file-input
          v-model="fileInput"
          @change="fileChanged"
          placeholder="Datei auswählen"
          :clearable="true"
          label="Bestehende BeerPong-Turnier Datei"
        />
        <v-expansion-panels v-model="fileContentPanel">
          <v-expansion-panel :disabled="!fileInput">
            <v-expansion-panel-header>
              Inhalt der Datei
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <p class="ml-6 mr-6" style="white-space: pre-line">
                {{ parsedContent }}
              </p>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="10">
        <v-btn color="primary" block @click="onStartClicked">
          Starten <v-icon class="ml-2">mdi-arrow-right-circle-outline</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="2">
        <v-btn color="error" block @click="onCancelClicked"
          ><v-icon>mdi-close-circle-outline</v-icon></v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { JsonToTournament } from "@/model/util/TournamentSaver";

export default {
  data: () => {
    return {
      fileInput: "",
      parsedContent: "",
      fileContentPanel: false,
    };
  },
  methods: {
    onCancelClicked() {
      this.$router.push("/");
    },

    fileChanged() {
      if (!this.fileInput) {
        this.parsedContent = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.parsedContent = reader.result;
      };
      this.parsedContent = reader.readAsText(this.fileInput);
    },

    onStartClicked() {
      this.$store.state.tournament.current = JsonToTournament(
        this.parsedContent
      );

      this.$router.push({ name: "GroupStage" });
    },
  },
};
</script>
