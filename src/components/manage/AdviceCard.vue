<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <p v-for="(advice, index) in advices" :key="index">
        <v-icon class="mr-2" color="primary"
          >mdi-arrow-right-circle-outline</v-icon
        >
        {{ advice }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    advices: {
      type: Array,
      default: () => ["Alles gut!"],
    },
    title: {
      type: String,
      default: "Nützliche Infos:",
    },
  },
  data: () => {
    return {};
  },
});
</script>