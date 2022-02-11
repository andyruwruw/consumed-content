<template>
  <div :class="$style.component">
    <show-cards
      title="Your Movies"
      :rows="true"
      :shows="movies"
      :saved="true" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { FAKE_MOVIES } from '../config';
import ShowCards from '../components/ui/show-cards/show-cards.vue';

export default Vue.extend({
  name: 'Movies',

  components: {
    ShowCards,
  },

  data: () => ({
    movies: FAKE_MOVIES,
  }),
});
</script>

<style lang="scss" module>
.component {
}
</style>
