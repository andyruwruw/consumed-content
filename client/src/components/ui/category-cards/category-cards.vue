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
      <category-card-item
        v-for="(category, index) in categories"
        :key="`category-${index}`"
        :id="index"
        :title="category.title"
        :shows="category.shows"
        :padding="rows" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import {
  FAKE_MOVIES,
  CATEGORY_NAMES,
} from '../../../config';

import CategoryCardItem from './category-card-item.vue';

export default Vue.extend({
  name: 'CategoryCards',

  components: {
    CategoryCardItem,
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
  },

  data: () => ({
    categories: [] as any[],
  }),

  created() {
    let editedShows = [];

    for (let i = 0; i < FAKE_MOVIES.length; i += 1) {
      editedShows.push(FAKE_MOVIES[i]);
    }

    editedShows = editedShows.sort(() => 0.5 - Math.random());

    const offset = Math.floor(Math.random() * 200);

    for (let i = 0; i < (this.limit === 0 ? 15 : this.limit); i += 1) {
      const shows = editedShows.splice(0, 4);

      this.categories.push({
        title: (CATEGORY_NAMES as string[])[(i + offset) % CATEGORY_NAMES.length] as string,
        shows,
      });
    }
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
