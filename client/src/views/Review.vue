<template>
  <div>
    <v-img
      height="20rem"
      :src="show.largeImageUrl" />

    <div :class="$style.content">
      <div :class="$style.show">
        <h1 @click="goToShow">
          {{ show.title }}
        </h1>

        <h2>
          {{ show.duration }}
        </h2>

        <h2>
          {{ show.genres.join(', ') }}
        </h2>

        <h2>
          {{ show.released }}
        </h2>

        <p>
          {{ show.description }}
        </p>

        <v-btn dark color="#E6B31D" tile style="margin-right: 1rem">
          Add Show
        </v-btn>

        <v-btn dark color="#E6B31D" tile @click="writeReview">
          Write Review
        </v-btn>
      </div>

      <div :class="$style.review">
        <div :class="$style.user">
          <v-img
            height="4rem"
            max-width="4rem"
            style="margin: 1rem 0"
            :src="getUser.image" />

          <div :class="$style['user-details']">
            <span :class="$style.name" @click="goToProfile">
              {{ getUser.name }}
            </span>

            <span :class="$style.username">
              {{ getUser.username }}
            </span>
          </div>
        </div>

        <p :class="$style.title">
          {{ title }}
        </p>

        <span>
          <v-icon
            v-for="i in 5"
            :key="`star-${i}-${id}`"
            :dark="i * 2 < rating"
            style="margin-bottom: 1rem">
            mdi-star
          </v-icon>
        </span>

        <p :class="$style.description">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

import {
  FEATURE,
  RANDOM_REVIEW_DESCRIPTIONS,
  RANDOM_REVIEW_TITLES,
} from '../config';

export default Vue.extend({
  name: 'Review',

  data: () => ({
    show: FEATURE,
    title: RANDOM_REVIEW_TITLES[Math.floor(Math.random() * RANDOM_REVIEW_TITLES.length)],
    description: RANDOM_REVIEW_DESCRIPTIONS[
      Math.floor(Math.random() * RANDOM_REVIEW_DESCRIPTIONS.length)
    ],
    rating: Math.floor(Math.random() * 10) + 1,
  }),

  computed: {
    ...mapGetters('user', [
      'getUser',
    ]),
  },

  methods: {
    writeReview() {
      this.$router.push('/review/1');
    },

    goToShow() {
      this.$router.push('/show/1');
    },

    goToProfile() {
      this.$router.push(`/profile/${this.getUser.id}`);
    },
  },
});
</script>

<style lang="scss" module>
.content {
  display: flex;
  justify-content: space-between;
}

.show {
  width: calc(50% - 2rem);

  h1 {
    color: white !important;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  h2 {
    color: rgba(255, 255, 255, 0.651) !important;
  }

  p {
    color: white;
  }
}

.review {
  width: calc(50% - 2rem);

  .title {
    font-size: 2rem;
    color: white;
  }

  .description {
    color: rgba(255, 255, 255, 0.685);
  }
}

.user {
  display: flex;

  .user-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 1rem;

    .name {
      color: white;
      font-size: 1rem;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }

    .username {
      color: rgba(255, 255, 255, 0.637);
      font-size: .8rem;
    }
  }
}
</style>
