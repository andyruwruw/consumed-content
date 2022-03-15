<template>
  <div :class="$style.component">
    <show-cards
      title="Saved Movies"
      :shows="shows" />

    <h3 v-if="shows !== null && shows.length === 0">
      No Movies Saved
    </h3>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  mapActions,
  mapGetters,
} from 'vuex';
import { IUserShowObject } from '../../../../shared/types';

import api from '../../api';
import ShowCards from '../../components/ui/show-cards/show-cards.vue';

export default Vue.extend({
  name: 'Movies',

  components: {
    ShowCards,
  },

  data: () => ({
    shows: [] as IUserShowObject[],
  }),

  async created() {
    this.handlePageLoad({
      name: this.$route.name,
    });
    this.requiresLogin();

    this.shows = await api.show.userShows(this.getUser.id, 'movie');
  },

  computed: {
    ...mapGetters('user', [
      'getUser',
    ]),
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
  h3 {
    color: rgba(255, 255, 255, 0.253);
    width: 100%;
    text-align: center;
    font-size: 3rem;
    font-weight: 200;
  }
}
</style>
