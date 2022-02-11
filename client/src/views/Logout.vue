<template>
  <div :class="$style.component">
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Logout',

  created() {
    this.$router.push('/');
  },
});
</script>
