<template>
  <div :class="$style.component">
    <h1>
      This is the landing page
    </h1>

    <p>
      This page will give our users a quick overview of the application in hopes that they sign up!
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Landing',

  components: {
  },
});
</script>

<style lang="scss" module>
.component {
  h1 {
    color: white;
  }

  p {
    color: white;
  }
}
</style>
