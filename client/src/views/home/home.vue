<template>
  <div>
    <movie-feature
      v-if="featureMovie !== null"
      :id="featureMovie.id"
      :name="featureMovie.name"
      :image="featureMovie.backdropUrl"
      :releaseDate="featureMovie.releaseDate"
      :overview="featureMovie.overview" />

    <show-cards
      title="Popular Movies"
      :shows="popularMovies"
      :rows="false" />

    <show-cards
      title="Popular Tv Shows"
      :shows="popularShows"
      :rows="false" />

    <show-cards
      title="Top Rated Movies"
      :shows="topMovies"
      :rows="false" />

    <show-cards
      title="Top Rated Tv Shows"
      :shows="topShows"
      :rows="false" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import api from '../../api';
import MovieFeature from '../../components/ui/features/movie-feature.vue';
import ShowCards from '../../components/ui/show-cards/show-cards.vue';

export default Vue.extend({
  name: 'Home',

  components: {
    ShowCards,
    MovieFeature,
  },

  data: () => ({
    popularShows: [],
    popularMovies: [],
    topMovies: [],
    topShows: [],
  }),

  async created() {
    this.popularShows = await api.show.getPopularTvShows();
    this.popularMovies = await api.show.getPopularMovies();
    this.topMovies = await api.show.getTopRatedMovies();
    this.topShows = await api.show.getTopRatedTvShows();
  },

  computed: {
    featureMovie() {
      if (this.popularMovies.length > 0) {
        return this.popularMovies[0];
      }
      return null;
    },
  },
});
</script>

<style lang="scss" module>

</style>
