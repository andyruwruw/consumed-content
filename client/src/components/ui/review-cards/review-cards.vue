<template>
  <div :class="$style.component">
    <span :class="$style.title">
      {{ title }}
    </span>

    <v-divider dark style="margin-top: 1rem;" />

    <div
      :class="[
        $style['item-wrapper'],
        {
          [$style['item-wrapper--rows']]: rows,
        },
      ]">
      <review-card-item
        v-for="(show, index) in editedShows"
        :key="show.title"
        :id="index"
        :title="show.title"
        :duration="show.duration"
        :genres="show.genres"
        :released="show.released"
        :imageUrl="show.imageUrl"
        :padding="rows"
        :rating="Math.round(Math.random() * 10)"
        :reviewTitle="reviewTitles[index % reviewTitles.length]"
        :description="reviewDescriptions[index % reviewDescriptions.length]"
        @unlike="unlike(index)" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import {
  FAKE_MOVIES,
  RANDOM_REVIEW_DESCRIPTIONS,
  RANDOM_REVIEW_TITLES,
} from '../../../config';
import ReviewCardItem from './review-card-item.vue';

export default Vue.extend({
  name: 'ReviewCards',

  components: {
    ReviewCardItem,
  },

  props: {
    title: {
      type: String,
      default: '',
    },

    rows: {
      type: Boolean,
      default: true,
    },

    limit: {
      type: Number,
      default: 0,
    },

    randomize: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    editedShows: [],
    reviewDescriptions: RANDOM_REVIEW_DESCRIPTIONS,
    reviewTitles: RANDOM_REVIEW_TITLES,
  }),

  created() {
    this.editedShows = [];

    for (let i = 0; i < FAKE_MOVIES.length; i += 1) {
      this.editedShows.push(FAKE_MOVIES[i]);
    }

    if (this.randomize) {
      this.editedShows = this.editedShows.sort(() => 0.5 - Math.random());
    }

    if (this.limit !== 0) {
      this.editedShows.length = this.limit;
    }
  },

  methods: {
    unlike(id: number) {
      const newShows = [];

      for (let i = 0; i < this.editedShows.length; i += 1) {
        if (i !== id) {
          newShows.push(this.editedShows[i]);
        }
      }

      this.editedShows = newShows;
    },
  },
});
</script>

<style lang="scss" module>
.component {
  margin: 2rem 0;
}

.title {
  color: white;
  font-size: 1.3rem;
}

.item-wrapper {
  display: flex;
  padding: 1.5rem 0;
  flex-wrap: wrap;
  flex-wrap: nowrap;
  overflow: auto;
  padding-bottom: 1rem;

  &.item-wrapper--rows {
    flex-wrap: wrap;
    justify-content: space-between;
  }

  &::-webkit-scrollbar {
    height: 4px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #0000001c;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: rgba(167, 167, 167, 0.171);
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(250, 250, 250, 0.425);
  }
}
</style>
