<template>
  <div :class="$style.component">
    <review-cards
      title="Your Reviews"
      :reviews="reviews" />

    <h3 v-if="reviews !== null && reviews.length === 0">
      No Reviews
    </h3>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  mapActions,
  mapGetters,
} from 'vuex';

import api from '../../api';
import ReviewCards from '../../components/ui/review-cards/review-cards.vue';

import { IUserReviewObject } from '../../../../shared/types';

export default Vue.extend({
  name: 'Reviews',

  components: {
    ReviewCards,
  },

  data: () => ({
    reviews: [] as IUserReviewObject[],
  }),

  async created() {
    this.handlePageLoad({
      name: this.$route.name,
    });
    this.requiresLogin();

    this.reviews = await api.review.getUserReviews(this.getUser.id);
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
