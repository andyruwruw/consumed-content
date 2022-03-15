<template>
  <div>
    <movie-feature
      v-if="featureMovie !== null"
      :id="featureMovie.id"
      :name="featureMovie.name"
      :image="featureMovie.backdropUrl"
      :releaseDate="featureMovie.releaseDate"
      :overview="featureMovie.overview" />

    <div :class="$style.content">
      <h1>
        Make an account now to track your favorite movies!
      </h1>

      <p>
        Write reviews, make collections, and share your favorite movies with your friends!
      </p>

      <div :class="$style.actions">
        <v-btn
          tile
          color="#E6B31D"
          @click="loginPage">
          Login or Register
        </v-btn>
      </div>
    </div>

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
import { mapActions } from 'vuex';

import api from '../../api';
import MovieFeature from '../../components/ui/features/movie-feature.vue';
import ShowCards from '../../components/ui/show-cards/show-cards.vue';

export default Vue.extend({
  name: 'Landing',

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
    this.handlePageLoad({
      name: this.$route.name,
    });

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

  methods: {
    loginPage() {
      this.$router.push('/login');
    },

    ...mapActions('navigation', [
      'handlePageLoad',
    ]),
  },
});
</script>

<style lang="scss" module>
.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 0rem;

  h1 {
    color: white;
    font-weight: 200;
    font-size: 2.5rem;
    margin-bottom: 1rem;
    text-align: center;
  }

  p {
    color: white;
    font-weight: 200;
    font-size: 1.4rem;
    text-align: center;
  }

  .actions {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }
}
</style>
