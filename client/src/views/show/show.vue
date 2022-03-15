<template>
  <div>
    <show-header
      v-if="show"
      :id="show.id"
      :name="show.name"
      :image="show.backdropUrl !== null && show.backdropUrl.length ? show.backdropUrl : show.posterUrl"
      :releaseDate="show.releaseDate" />

    <div :class="$style.content">
      <show-details
        v-if="show"
        :overview="show.overview"
        :image="show.posterUrl"
        :averageRating="averageRating" />

      <user-review
        v-if="show"
        :showId="show.id"
        :userId="getUser.id" />
    </div>

    <show-review-cards
      title="Reviews"
      :reviews="reviews"
      :rows="false"
      @found="refreshReviews" />

    <category-cards
      title="Add to a Category"
      :categories="categories"
      :add="true"
      :relevantId="id"
      @add="handleAdd" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  mapActions,
  mapGetters,
} from 'vuex';

import api from '../../api';
import ShowHeader from '../../components/ui/show/header.vue';
import ShowDetails from '../../components/ui/show/details.vue';
import UserReview from '../../components/ui/show/user-review.vue';
import ShowReviewCards from '../../components/ui/show-review-cards/show-review-cards.vue';
import CategoryCards from '../../components/ui/category-cards/category-cards.vue';

export default Vue.extend({
  name: 'Show',

  components: {
    ShowHeader,
    ShowDetails,
    ShowReviewCards,
    UserReview,
    CategoryCards,
  },

  data: () => ({
    id: -1,
    show: null,
    reviews: [],
    averageRating: -1,
    categories: [],
  }),

  async created() {
    const {
      id,
    } = this.$route.params;

    this.id = parseInt(id, 10);
    this.handlePageLoad({
      name: this.$route.name,
    });
    this.requiresLogin();

    this.show = await api.show.get(this.id);
    this.refreshReviews();
    this.categories = await api.category.getUserCategories(this.getUser.id);
  },

  methods: {
    ...mapActions('navigation', [
      'handlePageLoad',
      'requiresLogin',
    ]),

    async refreshReviews() {
      const {
        id,
      } = this.$route.params;

      const response = await api.review.getShowReviews(id);
      this.averageRating = response.averageRating;
      this.reviews = response.reviews;
    },

    async handleAdd(id: number) {
      await api.category.addShow(id, this.show.id);
      this.categories = await api.category.getUserCategories(this.getUser.id);
    },
  },

  computed: {
    ...mapGetters('user', [
      'getUser',
    ]),
  },
});
</script>

<style lang="scss" module>
.content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
