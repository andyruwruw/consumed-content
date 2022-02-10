<template>
  <v-navigation-drawer
    v-model="isOpen"
    color="#343434"
    app
    flat
    floating>
    <navigation-drawer-user />

    <v-btn color="#343434">
      Some Button
    </v-btn>

    <navigation-drawer-tabs />
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

import NavigationDrawerUser from './user.vue';
import NavigationDrawerTabs from './tabs.vue';

export default Vue.extend({
  name: 'NavigationDrawer',

  components: {
    NavigationDrawerUser,
    NavigationDrawerTabs,
  },

  computed: {
    ...mapGetters('user', [
      'getUser',
    ]),

    isOpen() {
      return this.$route.name !== 'Landing' && this.getUser !== null;
    },
  },
});
</script>

<style lang="scss" module>

</style>
