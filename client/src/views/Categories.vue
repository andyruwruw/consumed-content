<template>
  <div :class="$style.component">
    <category-cards
      title="Your Categories" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import CategoryCards from '../components/ui/category-cards/category-cards.vue';

export default Vue.extend({
  name: 'Category',

  components: {
    CategoryCards,
  },
});
</script>

<style lang="scss" module>
.component {
  h1 {
    color: white;
  }
}
</style>
