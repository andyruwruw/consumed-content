<template>
  <div :class="$style.component">
    <category-header
      :category="category"
      :shows="shows"
      @edited="fetch" />

    <show-cards
      title="Category Shows"
      :shows="shows"
      :category="true"
      @remove="handleRemove" />

    <h3 v-if="shows !== null && shows.length === 0">
      No Shows Added
    </h3>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

import CategoryHeader from './components/header.vue';
import ShowCards from '../../components/ui/show-cards/show-cards.vue';
import api from '../../api';
import { ICategoryShowObject, IUserCategoryObject } from '../../../../shared/types';

export default Vue.extend({
  name: 'Category',

  components: {
    CategoryHeader,
    ShowCards,
  },

  data: () => ({
    category: null as IUserCategoryObject | null,

    shows: [] as ICategoryShowObject[],
  }),

  async created() {
    this.handlePageLoad({
      name: this.$route.name,
    });
    this.requiresLogin();

    this.fetch();
  },

  methods: {
    ...mapActions('navigation', [
      'handlePageLoad',
      'requiresLogin',
    ]),

    async fetch() {
      const { id } = this.$route.params;

      this.category = await api.category.getCategory(parseInt(id, 10));
      this.shows = await api.category.getShows(parseInt(id, 10));
    },

    async handleRemove(id: number) {
      if (this.category && 'id' in this.category) {
        await api.category.removeShow(this.category.id, id);

        await this.fetch();
      }
    },
  },
});
</script>

<style lang="scss" module>
.component {
  display: block;

  h3 {
    color: rgba(255, 255, 255, 0.253);
    width: 100%;
    text-align: center;
    font-size: 3rem;
    font-weight: 200;
  }
}
</style>
