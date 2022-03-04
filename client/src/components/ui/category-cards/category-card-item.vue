<template>
  <div
    :class="[
      $style.component,
      {
        [$style.padding]: padding,
      },
    ]"
    @click="goToCategory">
    <div :class="$style.details">
      <span :class="$style.title">
        {{ name }}
      </span>

      <span :class="$style.genres">
        {{ `${shows.length} Shows` }}
      </span>
    </div>

    <div :class="$style.background">
      <div
        :class="$style.image"
        :style="{ backgroundImage: `url('${shows[0].imageUrl}')` }" />

      <div
        :class="$style.image"
        :style="{ backgroundImage: `url('${shows[1].imageUrl}')` }" />

      <div
        :class="$style.image"
        :style="{ backgroundImage: `url('${shows[2].imageUrl}')` }" />

      <div
        :class="$style.image"
        :style="{ backgroundImage: `url('${shows[3].imageUrl}')` }" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'CategoryCardItem',

  props: {
    id: {
      type: Number,
      default: 0,
    },

    userId: {
      type: Number,
      default: -1,
    },

    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: '',
    },
    
    created: {
      type: Number,
      default: 0,
    },

    username: {
      type: String,
      default: 'Unknown',
    },

    imageUrl: {
      type: String,
      default: '',
    },

    shows: {
      type: Array,
      required: true,
    },

    padding: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    goToCategory() {
      this.$router.push(`/category/${this.id}`);
    },
  },
});
</script>

<style lang="scss" module>
.component {
  display: flex;
  width: calc(20% - 2rem);
  max-width: 20rem;
  min-width: 12rem;
  height: 20rem;
  margin-right: 2rem;
  position: relative;
  cursor: pointer;

  &.padding {
    margin-bottom: 2rem;
  }

  &:hover {
    .details {
      .title {
        text-decoration: underline;
      }
    }
  }
}

.background {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;

  .image {
    display: block;
    width: 50%;
    height: 50%;
    background-size: cover;
    background-position: center;
  }
}

.details {
  display: flex;
  position: absolute;
  left: 0;
  z-index: 10;
  top: 0;
  bottom: 0;
  right: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  background: rgba(0, 0, 0, 0.719);
}

.title {
  color: white;
  font-size: 1.2rem;
  text-align: center;
  width: 100%;
}

.genres {
  color: rgba(255, 255, 255, 0.568);
}

.button-wrapper {
  position: absolute;
  right: 1rem;
  top: 1rem;
}
</style>
