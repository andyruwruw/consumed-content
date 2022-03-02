<template>
  <v-navigation-drawer
    v-if="isLoggedIn"
    :value="isOpen"
    color="#343434"
    app
    flat
    floating
    permanent>
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
      'isLoggedIn',
    ]),

    isOpen() {
      return this.isNavBarOpen
        || (this.$route.name !== 'Landing'
        && this.$route.name !== 'Login'
        && this.$route.name !== 'Logout'
        && this.getUser !== null);
    },
  },
});
</script>

<style lang="scss" module>

</style>
