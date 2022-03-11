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
        @remove="remove(index)" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import ShowCardItem from './show-card-item.vue';
import { IShow } from '../../../../../shared/types';

interface IData {
  editedShows: IShow[];
}

interface IMethods {
  remove: (index: number) => void;
  
}

interface IComputed {
}

interface IProps {
  title: string;
  shows: IShow[];
  rows: boolean;
}

export default Vue.extend<IData, IMethods, IComputed, IProps>({
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
      default: () => [] as IShow[],
    },

    rows: {
      type: Boolean,
      default: true,
    },
  },

  data: () => ({
    editedShows: [] as IShow[],
  }),

  created() {
    this.editedShows = this.shows;
  },

  methods: {
    remove(id: number) {
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
