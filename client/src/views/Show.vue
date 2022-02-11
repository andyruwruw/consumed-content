<template>
  <div :class="$style.component">
    <v-img
      height="20rem"
      :src="show.largeImageUrl" />

    <h1>
      {{ show.title }}
    </h1>

    <h2>
      {{ show.duration }}
    </h2>

    <h2>
      {{ show.genres.join(', ') }}
    </h2>

    <h2>
      {{ show.released }}
    </h2>

    <p>
      {{ show.description }}
    </p>

    <p>
      Available Platforms: Netflix, Hulu
    </p>

    <v-btn dark color="#E6B31D" tile style="margin-right: 1rem">
      Add Show
    </v-btn>

    <v-btn dark color="#E6B31D" tile @click="writeReview">
      Write Review
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { FEATURE } from '../config';

export default Vue.extend({
  name: 'Show',

  components: {
  },

  data: () => ({
    show: FEATURE,
  }),

  methods: {
    writeReview() {
      this.$router.push(`/review/${this.id}`);
    },
  },
});
</script>

<style lang="scss" module>
.component {
  h1 {
    color: white !important;
  }

  h2 {
    color: rgba(255, 255, 255, 0.651) !important;
  }

  p {
    color: white;
  }
}
</style>
