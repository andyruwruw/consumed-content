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
        :created="category.created"
        :description="category.description"
        :id="category.id"
        :imageUrl="category.imageUrl"
        :name="category.name"
        :userId="category.userId"
        :username="category.username"
        :padding="rows"
        :add="add"
        :relevantId="relevantId"
        @add="handleAdd" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import CategoryCardItem from './category-card-item.vue';
import { IUserCategoryObject } from '../../../../../shared/types';

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

    categories: {
      type: Array,
      default: () => [] as IUserCategoryObject[],
    },

    add: {
      type: Boolean,
      default: false,
    },

    relevantId: {
      type: Number,
      default: -1,
    },
  },

  methods: {
    handleAdd(id: number) {
      this.$emit('add', id);
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
