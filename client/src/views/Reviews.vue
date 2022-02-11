<template>
  <div>
    <review-cards
      title="Your Reviews"
      :rows="true"
      :limit="10" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import ReviewCards from '../components/ui/review-cards/review-cards.vue';

export default Vue.extend({
  name: 'Reviews',

  components: {
    ReviewCards,
  },
});
</script>
