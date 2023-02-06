<template>
  <div>
    <h4 v-if="simple">{{ name }}</h4>
    <v-chip v-else-if="!right" :color="color" outlined pill>
      <v-avatar :color="color" rounded left>
        <h3 class="white--text">{{ initials }}</h3>
        <!--<v-icon color="white">mdi-account-multiple</v-icon>-->
      </v-avatar>
      <v-img class="ml-1" v-if="cupLayoutEnabled" width="28" :src="cupLayout.file" @click="showCupLayout"/>
      <h3 :style="{ 'color': color}" >
        {{name ? name : "?" }}
      </h3>
    </v-chip>
    <v-chip v-else :color="color" outlined pill>
      <h3 :style="{ 'color': color}" >
        {{ name ? name : "?" }}
      </h3>
      <v-img v-if="cupLayoutEnabled" width="28" :src="cupLayout.file" @click="showCupLayout"/>
      <v-avatar :color="color" rounded right>
        <h3 class="white--text">{{ initials }}</h3>
        <!--<v-icon color="white">mdi-account-multiple</v-icon>-->
      </v-avatar>
    </v-chip>
    <v-dialog v-model="dialogCupLayout" max-width="600">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Becher-Layout: {{ cupLayout.name }}
        </v-card-title>
        <v-card-text>
          <v-img :src="cupLayout.file"></v-img>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              text
              @click="dialogCupLayout = false"
          > Schließen
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    simple: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "primary",
    },
    right: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: "",
    },
    greyedOut: {
      type: Boolean,
      default: false
    },
    cupLayoutEnabled: {
      type: Boolean,
      default: false
    },
    cupLayout: {
      type: Object,
      default: () => {return {file: "", name: "Unbekannt"}}
    }
  },
  data: () => {
    return {
      dialogCupLayout: false
    }
  },
  computed: {
    initials() {
      const parts = this.name
          .slice()
          .replace("+", " ")
          .split(" ")
          .map((s) => s.trim())
          .filter(Boolean);
      if (!parts || parts.length === 0) return "?";
      else if (parts.length === 1) {
        return parts[0].toUpperCase().charAt(0);
      } else {
        return (
            parts[0].toUpperCase().charAt(0) + parts[1].toUpperCase().charAt(0)
        );
      }
    },
  }, methods: {
    showCupLayout() {
      this.dialogCupLayout = true
    }
  }
};
</script>
