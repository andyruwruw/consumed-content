<template>
  <v-navigation-drawer
    v-model="isOpen"
    color="#343434"
    app
    flat
    floating>
    <navigation-drawer-user />

    <navigation-drawer-my-profile-button />

    <navigation-drawer-tabs />
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

import NavigationDrawerUser from './user.vue';
import NavigationDrawerTabs from './tabs.vue';
import NavigationDrawerMyProfileButton from './my-profile-button.vue';

export default Vue.extend({
  name: 'NavigationDrawer',

  components: {
    NavigationDrawerUser,
    NavigationDrawerTabs,
    NavigationDrawerMyProfileButton,
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
