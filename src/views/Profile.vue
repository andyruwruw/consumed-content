<template>
  <div>
    <div :class="$style.header">
      <img
        :src="getUser.image"
        :class="$style.image" />

      <div :class="$style.details">
        <span :class="$style.name">
          {{ getUser.name }}
        </span>

        <span :class="$style.username">
          {{ getUser.username }}
        </span>

        <v-spacer />

        <span :class="$style.stats">
          84 Movies, 22 TV Shows
        </span>
      </div>
    </div>

    <show-cards
      title="Favorite Movies"
      :shows="movies"
      :limit="10"
      :rows="false" />

    <category-cards
      title="Andrew's Categories"
      :limit="10"
      :rows="false" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

import { FAKE_MOVIES } from '../config';
import ShowCards from '../components/ui/show-cards/show-cards.vue';
import CategoryCards from '../components/ui/category-cards/category-cards.vue';

export default Vue.extend({
  name: 'Profile',

  components: {
    CategoryCards,
    ShowCards,
  },

  data: () => ({
    movies: FAKE_MOVIES,
  }),

  computed: {
    ...mapGetters('user', [
      'getUser',
    ]),
  },
});
</script>

<style lang="scss" module>
.header {
  display: flex;
  background: #2E2E2E;
}

.image {
  $size: 15rem;

  display: block;
  height: $size;
  width: $size;
  margin-right: 2rem;
}

.details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 0;

  .name {
    font-size: 2rem;
    color: white;
  }

  .username {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.466);
  }

  .stats{
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.466);
  }
}
</style>
