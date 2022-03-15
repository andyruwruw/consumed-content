<template>
  <div>
    <profile-header :user="user" />

    <profile-private v-if="(!'private' in user || user.private) && user.id !== getUser.id" />

    <div v-else>
      <show-cards
        title="Saved Movies"
        :shows="movies"
        :rows="false" />

      <show-cards
        title="Saved TV Shows"
        :shows="shows"
        :rows="false" />

      <review-cards
        title="Reviews"
        :reviews="reviews"
        :rows="false" />

      <category-cards
        title="Categories"
        :categories="categories"
        :rows="false" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

import api from '../../api';
import ProfileHeader from './components/header.vue';
import ProfilePrivate from './components/private.vue';

import {
  IPublicUserObject,
  IUserCategoryObject,
  IUserReviewObject,
  IUserShowObject,
} from '../../../../shared/types';
import CategoryCards from '../../components/ui/category-cards/category-cards.vue';
import ReviewCards from '../../components/ui/review-cards/review-cards.vue';
import ShowCards from '../../components/ui/show-cards/show-cards.vue';

export default Vue.extend({
  name: 'Profile',

  components: {
    ProfileHeader,
    ProfilePrivate,
    CategoryCards,
    ReviewCards,
    ShowCards,
  },

  data: () => ({
    user: null as null | IPublicUserObject,

    categories: [] as IUserCategoryObject[],

    reviews: [] as IUserReviewObject[],

    movies: [] as IUserShowObject[],
    shows: [] as IUserShowObject[],
  }),

  async created() {
    const id = parseInt(this.$route.params.id, 10);

    this.user = await api.user.get(id);
    this.categories = await api.category.getUserCategories(id);
    this.reviews = await api.review.getUserReviews(id);
    this.movies = await api.show.userShows(this.getUser.id, 'movie');
    this.shows = await api.show.userShows(this.getUser.id, 'tv-show');
  },

  computed: {
    ...mapGetters('user', [
      'getUser',
    ]),
  },
});
</script>

<style lang="scss" module>

</style>
