<template>
  <div>
    <show-list-item
      v-for="show in shows"
      :key="show.title"
      :title="show.title"
      :duration="show.duration"
      :genres="show.genres"
      :released="show.released"
      :imageUrl="show.imageUrl" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { FAKE_MOVIES } from '../../../config';
import ShowListItem from './show-list-item.vue';

export default Vue.extend({
  name: 'ShowList',

  components: {
    ShowListItem,
  },

  data: () => ({
    shows: FAKE_MOVIES,
  }),
});
</script>
