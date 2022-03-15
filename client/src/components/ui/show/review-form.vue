<template>
  <div :class="$style.component">
    <h3>
      Write a Review
    </h3>

    <div :class="$style.rating">
      <v-icon
        :class="$style.star"
        v-for="number in 10"
        color="#E6B31D"
        :key="`star-rating-${number}`"
        @click="changeRating(number)">
        {{ number > rating ? 'mdi-star-outline' : 'mdi-star' }}
      </v-icon>
    </div>

    <v-text-field
      v-model="title"
      style="margin-bottom: 1rem"
      placeholder="Title"
      dark
      outlined
      hide-details
      dense />

    <v-textarea
      v-model="description"
      placeholder="Details"
      dark
      outlined
      hide-details
      dense />

    <div :class="$style.actions">
      <v-btn
        color="#E6B31D"
        :disabled="!valid"
        @click="execute">
          Create
        </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import api from '../../../api';

export default Vue.extend({
  name: 'ReviewForm',

  data: () => ({
    title: '',
    description: '',
    rating: 0,
  }),

  props: {
    showId: {
      type: Number,
      required: true,
    },
  },

  methods: {
    changeRating(index: number) {
      this.rating = index;
    },

    async execute() {
      await api.review.create(
        this.showId,
        this.title,
        this.rating,
        this.description,
      );

      this.$emit('created');
    },
  },

  computed: {
    valid() {
      return this.title.length !== 0;
    },
  },
});
</script>

<style lang="scss" module>
.component {
  margin: 2rem 0;
  max-width: calc(100vw - 2rem);
  min-width: 600px;
  width: calc(100% - 600px - 1rem);

  h3 {
    color: rgba(255, 255, 255, 0.349);
    font-weight: 200;
    margin-bottom: .5rem;
  }
}

.rating {
  margin-bottom: .8rem;

  .star {
    cursor: pointer;
  }
}

.actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}
</style>
