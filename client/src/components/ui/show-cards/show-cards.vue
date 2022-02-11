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
      <show-card-item
        v-for="show in editedShows"
        :key="show.title"
        :title="show.title"
        :duration="show.duration"
        :genres="show.genres"
        :released="show.released"
        :imageUrl="show.imageUrl" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import ShowCardItem from './show-card-item.vue';

export default Vue.extend({
  name: 'ShowCards',

  components: {
    ShowCardItem,
  },

  props: {
    title: {
      type: String,
      default: '',
    },

    shows: {
      type: Array,
      default: () => [],
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

  computed: {
    editedShows() {
      let newShows = this.shows;

      if (this.randomize) {
        newShows = newShows.sort(() => 0.5 - Math.random());
      }

      if (this.limit > 0) {
        newShows = newShows.slice(0, this.limit as number);
      }

      return newShows;
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
  padding-bottom: 1rem;

  &.item-wrapper--rows {
    flex-wrap: nowrap;
    overflow: auto;
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
