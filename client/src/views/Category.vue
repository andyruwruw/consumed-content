<template>
  <div :class="$style.component">
    <h1>
      Andrew's Category: Horror
    </h1>

    <v-btn
      dark
      outlined
      @click="deleteCategory">
      Delete
    </v-btn>

    <show-list />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import ShowList from '../components/ui/show-list/show-list.vue';

export default Vue.extend({
  name: 'Category',

  components: {
    ShowList,
  },

  methods: {
    deleteCategory() {
      this.$router.push('/home');
    },
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
