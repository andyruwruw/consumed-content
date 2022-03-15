<template>
  <div :class="$style.component">
    <review-form
      v-if="review === null"
      :showId="showId"
      @created="findingReview" />

    <h3 v-if="review !== null">
      Your Review
    </h3>

    <div
      v-if="review !== null"
      :class="$style.details">
      <span>
        <v-icon
          :class="{
            [$style.clickable]: mode === 1,
          }"
          v-for="number in 10"
          :key="`star-${number}-${showId}-${userId}`"
          color="#E6B31D"
          small
          @click="changeRating(number)">
          {{ number > rating ? 'mdi-star-outline' : 'mdi-star' }}
        </v-icon>
      </span>

      <span
        :class="$style.username"
        @click="goToUser">
        {{ getUser.username }}
      </span>

      <v-img
        :src="getUser.imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'"
        :class="$style.image" />

      <p
        v-if="mode === 0"
        style="padding-top: .5rem"
        :class="$style.title"
        @click="goToReview">
        {{ review.name }}
      </p>

      <v-text-field
        v-if="mode === 1"
        v-model="name"
        outlined
        dark
        hide-details
        label="Title"
        dense
        style="flex: none; margin: 0.5rem 0;" />

      <p
        v-if="mode === 0"
        :class="$style.description">
        {{ review.description }}
      </p>

      <v-textarea
        v-if="mode === 1"
        v-model="description"
        outlined
        dark
        label="Description"
        hide-details
        dense
        style="flex: none; margin: 0.5rem 0;" />

      <v-spacer />

      <div :class="$style.actions">
        <v-btn
          color="#E6B31D"
          dark
          outlined
          style="margin-right: 1rem;"
          @click="removeReview">
          Delete
        </v-btn>

        <v-btn
          color="#E6B31D"
          dark
          :outlined="mode === 0"
          @click="toggleMode">
          {{ actionText }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

import api from '../../../api';
import ReviewForm from './review-form.vue';

interface IData {
}

interface IMethods {
}

interface IComputed {
}

interface IProps {
}

export default Vue.extend<IData, IMethods, IComputed, IProps>({
  name: 'UserReview',

  components: {
    ReviewForm,
  },

  props: {
    showId: {
      type: Number,
      required: true,
    },

    userId: {
      type: Number,
      required: true,
    },
  },

  data: () => ({
    review: null,
    mode: 0,
    rating: 0,
    name: '',
    description: '',
  }),

  created() {
    this.findingReview();
  },

  methods: {
    async findingReview() {
      const reviews = await api.review.getUserReviews(this.userId);

      for (let i = 0; i < reviews.length; i += 1) {
        const review = reviews[i];

        if (review.showId === this.showId) {
          this.review = review;
          this.rating = this.review.rating;
          this.name = this.review.name;
          this.description = this.review.description;
          this.$emit('found');
          break;
        }
      }
    },

    changeRating(index: number) {
      if (this.mode === 1) {
        this.rating = index;
      }
    },

    toggleMode() {
      if (this.mode) {
        this.save();
      } else {
        this.rating = this.review.rating;
        this.name = this.review.name;
        this.description = this.review.description;
      }
      this.mode = this.mode === 1 ? 0 : 1;
    },

    async save() {
      await api.review.edit(
        this.review.id,
        this.name,
        this.rating,
        this.description,
      );

      this.findingReview();
    },

    async removeReview() {
      await api.review.deleteOne(this.review.id);
      this.review = null;
    },

    goToUser() {
      this.$router.push(`/profile/${this.userId}`);
    },

    goToReview() {
      this.$router.push(`/review/${this.showId}/${this.review !== null ? this.review.id : 0}`);
    },
  },

  computed: {
    ...mapGetters('user', [
      'getUser',
    ]),

    actionText() {
      return this.mode === 0 ? 'Edit' : 'Save';
    },
  },
});
</script>

<style lang="scss" module>
.component {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin: 2rem 0;

  h3 {
    color: rgba(255, 255, 255, 0.349);
    font-weight: 200;
    margin-bottom: .5rem;
  }
}

.clickable {
  cursor: pointer;
}

.details {
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  background: #2E2E2E;
  padding: 16px;
  max-width: calc(100vw - 2rem);
  min-width: 600px;
  width: calc(100% - 600px - 1rem);
  height: 100%;
  position: relative;
}

.title {
  color: white;
  font-size: 1.2rem;
  width: 100%;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}

.description {
  margin-top: 0rem;
  color: rgba(255, 255, 255, 0.384);
  max-height: 8rem;
  font-weight: 200;
}

.image {
  display: block;
  width: 3rem;
  height: 3rem;
  position: absolute;
  right: 1rem;
  top: 1rem;
  border-radius: 50%;
}

.username {
  color: rgba(255, 255, 255, 0.349);
  font-weight: 200;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
