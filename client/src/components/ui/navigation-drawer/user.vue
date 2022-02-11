<template>
  <div :class="$style.component">
    <div
      :class="$style.image"
      :style="{
        'background-image': `url('${getUser.image}')`,
      }" />

    <span :class="$style.name">
      {{ getUser.name }}
    </span>

    <span :class="$style.username">
      {{ getUser.username }}
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'NavigationDrawerUser',

  computed: {
    ...mapGetters('user', [
      'getUser',
    ]),
  },
});
</script>

<style lang="scss" module>
.component {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem;
}

.image {
  $image-size: 5rem;
  display: block;
  height: $image-size;
  width: $image-size;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  margin-bottom: 1rem;
}

.name {
  color: #FFFFFF;
  font-size: 1.2rem;
  margin-bottom: 0.2rem;
}

.username {
  color: #6F6F6F;
}
</style>
