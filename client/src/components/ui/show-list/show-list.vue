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
      <show-list-item
        v-for="(show, index) in shows"
        :key="`${show.name}-${index}-show-list`"
        :id="show.id"
        :name="show.name"
        :released="show.released"
        :image="show.posterUrl"
        :padding="rows" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import ShowListItem from './show-list-item.vue';
import { IShow } from '../../../../../shared/types';

export default Vue.extend({
  name: 'ShowList',

  components: {
    ShowListItem,
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
});
</script>

<style lang="scss" module>
.component {
  margin: 2rem 0;
  width: calc(50% - 1rem);
}

.title {
  color: white;
  font-size: 1.3rem;
}

.item-wrapper {
  display: flex;
  flex-direction: column;
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
