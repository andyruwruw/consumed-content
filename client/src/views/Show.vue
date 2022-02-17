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
      Available Platforms:
      <span
        v-for="platform in platforms"
        :key="`platform-${platform}`"
        :class="$style.platform"
        @click="goToPlatform(platform)">
        {{ platform }}
      </span>
    </p>

    <v-btn dark color="#E6B31D" tile style="margin-right: 1rem">
      Add Show
    </v-btn>

    <v-btn dark color="#E6B31D" tile @click="writeReview">
      Write Review
    </v-btn>

    <v-text-field
      style="margin-top: 1rem"
      dark
      outlined
      color="#E6B31D"
      placeholder="Share what platform you viewed this on" />
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
    platforms: [
      'Netflix',
      'Hulu',
    ],
  }),

  methods: {
    writeReview() {
      this.$router.push('/review/1');
    },

    goToPlatform(platform: string) {
      this.$router.push(`/platform/${platform}`);
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

.platform {
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}
</style>
