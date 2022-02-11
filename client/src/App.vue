<template>
  <v-app>
    <app-bar />

    <navigation-drawer />

    <v-main style="margin: 0 1rem">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

import AppBar from './components/ui/app-bar/index.vue';
import NavigationDrawer from './components/ui/navigation-drawer/index.vue';

export default Vue.extend({
  name: 'App',

  components: {
    AppBar,
    NavigationDrawer,
  },
});
</script>
