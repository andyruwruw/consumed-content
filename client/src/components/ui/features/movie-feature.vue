<template>
  <div
    :class="$style.component"
    :style="{
      'background-image': `url('${imageUrl}')`,
    }">
    <div :class="$style.content">
      <div :class="$style.header">
        <span :class="$style.title">
          {{ title }}
        </span>

        <v-btn
          color="#E6B31D"
          icon>
          <v-icon large>
            mdi-plus
          </v-icon>
        </v-btn>
      </div>

      <div :class="$style.details">
        <span :class="[$style.duration, $style['detail-item']]">
          {{ duration }}
        </span>

        <span :class="[$style.genres, $style['detail-item']]">
          {{ genres.join(', ') }}
        </span>

        <span :class="[$style.released, $style['detail-item']]">
          {{ released }}
        </span>
      </div>

      <span :class="$style.description">
        {{ description }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'MovieFeature',

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

    description: {
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
  align-items: flex-end;
  width: 100%;
  height: 30rem;
  background: black;
  background-size: cover;
  background-position: 50% 40%;
}

.content {
  display: block;
  width: 100%;
  height: 12rem;
  max-width: 50rem;
  background: rgba(0, 0, 0, 0.637);
  padding: 2rem;
  color: white;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 1.8rem;
}

.details {
  padding: 0.5rem 0;
  display: flex;
  width: 100%;
}

.detail-item {
  margin-right: 1.5rem;
}

.description {
  font-size: .9rem;
  color: rgba(255, 255, 255, 0.726);
}
</style>
