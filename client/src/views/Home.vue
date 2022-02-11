<template>
  <div>
    <movie-feature
      :description="feature.description"
      :genres="feature.genres"
      :title="feature.title"
      :duration="feature.duration"
      :released="feature.released"
      :imageUrl="feature.largeImageUrl" />

    <show-cards
      title="Popular Now"
      :shows="movies"
      :limit="10"
      :randomize="true" />

    <show-cards
      title="People You're Following"
      :shows="movies"
      :limit="10"
      :randomize="true" />

    <show-cards
      title="Top Rated"
      :shows="movies"
      :limit="10"
      :randomize="true" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import {
  FAKE_MOVIES,
  FEATURE,
} from '../config';
import MovieFeature from '../components/ui/features/movie-feature.vue';
import ShowCards from '../components/ui/show-cards/show-cards.vue';

export default Vue.extend({
  name: 'Home',

  components: {
    MovieFeature,
    ShowCards,
  },

  data: () => ({
    feature: FEATURE,
    movies: FAKE_MOVIES,
  }),
});
</script>
