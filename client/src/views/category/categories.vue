<template>
  <div :class="$style.component">
    <v-btn
      :class="$style.add"
      color="#E6B31D"
      text
      @click="add">
      <v-icon large left>
        mdi-plus
      </v-icon>
      Create
    </v-btn>

    <category-cards
      title="Your Categories"
      :categories="categories" />

    <h3 v-if="categories !== null && categories.length === 0">
      No Categories
    </h3>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  mapActions,
  mapGetters,
} from 'vuex';

import api from '../../api';
import CategoryCards from '../../components/ui/category-cards/category-cards.vue';

export default Vue.extend({
  name: 'Categories',

  components: {
    CategoryCards,
  },

  data: () => ({
    categories: [],
  }),

  async created() {
    this.handlePageLoad({
      name: this.$route.name,
    });
    this.requiresLogin();

    this.refresh();
  },

  computed: {
    ...mapGetters('user', [
      'getUser',
    ]),
  },

  methods: {
    ...mapActions('navigation', [
      'handlePageLoad',
      'requiresLogin',
    ]),

    async add() {
      await api.category.create();

      this.refresh();
    },

    async refresh() {
      this.categories = await api.category.getUserCategories(this.getUser.id);
    },
  },
});
</script>

<style lang="scss" module>
.component {
  position: relative;
  h3 {
    color: rgba(255, 255, 255, 0.253);
    width: 100%;
    text-align: center;
    font-size: 3rem;
    font-weight: 200;
  }
}

.add {
  position: absolute;
  right: 1rem;
  top: 0rem;
}
</style>
