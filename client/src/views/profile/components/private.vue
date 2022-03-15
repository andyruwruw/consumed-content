<template>
  <div :class="$style.component">
    <span :class="$style.message">
      This user is private.
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ProfilePrivate',
});
</script>

<style lang="scss" module>
.component {
  margin: 5rem 0;

  .message {
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.11);
    text-align: center;
    width: 100%;
    display: block;
  }
}
</style>
