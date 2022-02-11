<template>
  <div :class="$style.component">
    <h1>
      Landing Page
    </h1>

    <p>
    </p>

    <p>
      This page will give our users a quick overview of the application in hopes that they sign up!
    </p>

    <p>
      For now, click the login button at the top right.
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
