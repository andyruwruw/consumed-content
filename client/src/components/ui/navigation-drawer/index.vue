<template>
  <v-navigation-drawer
    v-model="isOpen"
    color="#343434"
    app
    flat
    floating>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'NavigationDrawer',

  computed: {
    isOpen() {
      return true;
    },
  },
});
</script>

<style lang="scss" module>

</style>
