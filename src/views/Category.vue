<template>
  <div :class="$style.component">
    <h1>
      Andrew's Category: Horror
    </h1>

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
});
</script>

<style lang="scss" module>
.component {
  h1 {
    color: white;
  }
}
</style>
