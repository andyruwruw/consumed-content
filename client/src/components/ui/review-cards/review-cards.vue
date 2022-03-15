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
        v-for="review in reviews"
        :key="review.id"
        :id="review.id"
        :name="review.name"
        :showName="review.showName"
        :showId="review.showId"
        :image="review.posterUrl"
        :padding="rows"
        :rating="review.rating"
        :description="review.description" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

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

    reviews: {
      type: Array,
      default: () => [],
    },

    rows: {
      type: Boolean,
      default: true,
    },
  },

  created() {
    console.log(this.reviews);
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
