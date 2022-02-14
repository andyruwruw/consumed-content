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
        v-for="(show, index) in editedShows"
        :key="show.title"
        :id="index"
        :title="show.title"
        :duration="show.duration"
        :genres="show.genres"
        :released="show.released"
        :imageUrl="show.imageUrl"
        :padding="rows"
        :saved="saved"
        @unlike="unlike(index)" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import ShowCardItem from './show-card-item.vue';
import { IShow } from '../../../types';

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

    saved: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    editedShows: [] as Record<string, any>[],
  }),

  created() {
    this.editedShows = [] as Record<string, any>[];

    for (let i = 0; i < this.shows.length; i += 1) {
      this.editedShows.push((this.shows[i] as Record<string, any>[]));
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

      this.editedShows = newShows as IShow[];
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
