<template>
  <div
    :class="$style.component"
    @click="clicked">
    <div
      :class="$style.image"
      :style="{
        'background-image': `url('${imageUrl}')`,
      }" />

    <div :class="$style.content">
      <div :class="$style['main-details']">
        <span :class="$style.title">
          {{ title }}
        </span>

        <span :class="$style.duration">
          {{ duration }}
        </span>
      </div>

      <div :class="$style['alt-details']">
        <span :class="$style.genres">
          {{ genres.join(', ') }}
        </span>

        <span :class="$style['release-date']">
          Released: {{ released }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ShowListItem',

  props: {
    title: {
      type: String,
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    genres: {
      type: Array,
      required: true,
    },

    released: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },
  },

  methods: {
    clicked() {
      this.$router.push(`/show/${this.title}`);
    },
  },
});
</script>

<style lang="scss" module>
.component {
  display: flex;
  margin: 1rem;
  width: 800px;
  background: #2E2E2E;
  padding: 1rem;
  cursor: pointer;
}

.content {
  display: flex;
  justify-content: space-between;
  width: calc(100% - 1rem - 4rem);
}

.main-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.alt-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.image {
  $size: 4rem;

  display: block;
  height: $size;
  width: $size;
  background-size: 100% auto;
  margin-right: 1rem;
}

.title {
  color: white;
}

.duration {
  color: rgba(255, 255, 255, 0.322);
}

.genres {
  color: rgba(255, 255, 255, 0.322);
  text-align: right;
}

.release-date {
  color: rgba(255, 255, 255, 0.322);
  text-align: right;
}
</style>
