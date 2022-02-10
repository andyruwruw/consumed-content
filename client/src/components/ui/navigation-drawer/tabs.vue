<template>
  <v-tabs
    background-color="transparent"
    color="#E6B31D"
    dark
    left
    vertical>
    <div
      v-for="tab in tabs"
      :key="tab.text">
      <v-tab v-if="tab.type === 'tab'">
        <v-icon left>
          {{ tab.icon }}
        </v-icon>
        {{ tab.text }}
      </v-tab>

      <v-separator
        v-if="tab.type === 'separator'"
        dark />
    </div>
  </v-tabs>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'NavigationDrawerTabs',

  data: () => ({
    tabs: [
      {
        icon: 'mdi-magnify',
        text: 'Browse',
        type: 'tab',
      },
      {
        icon: 'mdi-filmstrip',
        text: 'Movies',
        type: 'tab',
      },
      {
        icon: 'mdi-television',
        text: 'TV Shows',
        type: 'tab',
      },
      {
        text: 'separator',
        type: 'separator',
      },
    ],
  }),
});
</script>
