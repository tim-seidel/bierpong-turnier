<template>
  <h4 v-if="simple">{{ name }}</h4>
  <v-chip v-else-if="!right" :color="color" outlined pill>
    <v-avatar :color="color" left>
      <h3 class="white--text">{{ initials }}</h3>
      <!--<v-icon color="white">mdi-account-multiple</v-icon>-->
    </v-avatar>
    <h3 class="primary--text ml-1">
      {{ name ? name : "?" }}
    </h3>
  </v-chip>
  <v-chip v-else :color="color" outlined pill>
    <h3 class="primary--text mr-1">
      {{ name ? name : "?" }}
    </h3>
    <v-avatar :color="color" right>
      <h3 class="white--text">{{ initials }}</h3>
      <!--<v-icon color="white">mdi-account-multiple</v-icon>-->
    </v-avatar>
  </v-chip>
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
  },
};
</script>
