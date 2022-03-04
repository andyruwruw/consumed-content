<template>
  <div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import api from '../../api';
import { IPublicUserObject } from '../../../../shared/types';

export default Vue.extend({
  name: 'Profile',

  data: () => ({
    user: null as null | IPublicUserObject,
  }),

  async created() {
    const id = parseInt(this.$route.params.id, 10);

    this.user = await api.user.get(id);
  },
});
</script>

<style lang="scss" module>

</style>
