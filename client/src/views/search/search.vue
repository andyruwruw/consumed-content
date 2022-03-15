<template>
  <div :class="$style.component">
    <show-list
      title="Movies Results"
      :shows="movies"
      :rows="false" />

    <show-list
      title="TV Show Results"
      :shows="tvShows"
      :rows="false" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import api from '../../api';

import ShowList from '../../components/ui/show-list/show-list.vue';

export default Vue.extend({
  name: 'Search',

  components: {
    ShowList,
  },

  data: () => ({
    movies: [],

    tvShows: [],
  }),

  async created() {
    this.handlePageLoad({
      name: this.$route.name,
    });
    this.requiresLogin();

    const {
      query,
    } = this.$route.params;

    this.movies = await api.show.searchMovies(query, 1);
    this.tvShows = await api.show.searchTvShows(query, 1);
  },

  methods: {
    ...mapActions('navigation', [
      'handlePageLoad',
      'requiresLogin',
    ]),
  },
});
</script>

<style lang="scss" module>
.component {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
</style>
