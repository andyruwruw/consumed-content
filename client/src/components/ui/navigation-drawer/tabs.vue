<template>
  <v-tabs
    v-model="tab"
    background-color="transparent"
    color="#E6B31D"
    dark
    left
    vertical
    @change="changePage">
    <div
      v-for="tab in tabs"
      :key="tab.text">
      <v-tab
        v-if="tab.type === 'tab'"
        style="margin-bottom: 1rem;">
        <v-icon
          style="margin-right: 1rem;"
          left>
          {{ tab.icon }}
        </v-icon>
        {{ tab.text }}
      </v-tab>

      <div
        v-if="tab.type === 'divider'"
        :class="$style['divider-wrapper']">
        <v-divider :dark="true" />
      </div>
    </div>
  </v-tabs>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
  name: 'NavigationDrawerTabs',

  data: () => ({
    tab: 0,
    tabs: [
      {
        icon: 'mdi-magnify',
        text: 'Browse',
        type: 'tab',
        path: '/home',
      },
      {
        icon: 'mdi-filmstrip',
        text: 'Movies',
        type: 'tab',
        path: '/movies',
      },
      {
        icon: 'mdi-television',
        text: 'TV Shows',
        type: 'tab',
        path: '/shows',
      },
      {
        text: 'divider1',
        type: 'divider',
      },
      {
        icon: 'mdi-folder-table-outline',
        text: 'My Categories',
        type: 'tab',
        path: '/category',
      },
      {
        icon: 'mdi-message-draw',
        text: 'My Reviews',
        type: 'tab',
        path: '/review',
      },
      {
        text: 'divider2',
        type: 'divider',
      },
      {
        icon: 'mdi-logout',
        text: 'Logout',
        type: 'tab',
        path: '/logout',
      },
    ],
  }),

  methods: {
    ...mapActions('user', [
      'logout',
    ]),

    changePage() {
      let index = this.tab;
      if (index >= 3) {
        index += 1;
      }
      if (index >= 6) {
        index += 1;
      }
      const path = this.tabs[index].path as string;

      if (path === '/logout') {
        this.logout();
      } else {
        this.$router.push(path);
      }
    },
  },
});
</script>

<style lang="scss" module>
.divider-wrapper {
  margin: 1rem 1rem;
}
</style>
