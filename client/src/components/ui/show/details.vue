<template>
  <div :class="$style.component">
    <div
      :class="$style.poster"
      :style="{
        'background-image': `url('http://image.tmdb.org/t/p/original/${image}')`,
      }" />

    <div :class="$style.content">
      <h3>
        Average Rating
      </h3>

      <span :class="$style.rating">
        {{ averageRating === -1 ? 'N/A' : Math.round(averageRating * 10) / 10 }}
      </span>

      <h3>
        Overview
      </h3>

      <span :class="$style.overview">
        {{ overview ? overview : 'No description' }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface IData {
}

interface IMethods {
  clicked: () => void;
}

interface IComputed {
}

interface IProps {
  overview: string;
  image: string;
  averageRating: number;
}

export default Vue.extend<IData, IMethods, IComputed, IProps>({
  name: 'ShowDetails',

  props: {
    image: {
      type: String,
      required: true,
    },

    overview: {
      type: String,
      default: '',
    },

    averageRating: {
      type: Number,
      default: -1,
    },
  },

  data: () => ({
  }),

  async created() {
  },

  computed: {
  },
});
</script>

<style lang="scss" module>
.component {
  display: flex;
  align-items: flex-start;
  margin: 2rem 0;
}

.content {
  margin-left: 1rem;

  h3 {
    color: rgba(255, 255, 255, 0.349);
    font-weight: 200;
    margin-bottom: .5rem;
  }
}

.poster {
  display: block;
  width: 12rem;
  height: 20rem;
  background: black;
  background-size: cover;
  background-position: 50% 40%;
}

.rating {
  display: block;
  width: 24rem;
  color: rgba(255, 255, 255, 0.842);
  font-weight: 200;
  margin-bottom: 1rem;
}

.overview {
  display: block;
  width: 24rem;
  max-height: calc(20rem - 28px - 8px - 28px - 8px - 24px - 16px);
  overflow: auto;
  color: rgba(255, 255, 255, 0.842);
  font-weight: 200;

  &::-webkit-scrollbar {
    height: 4px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #0000001c;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: rgba(167, 167, 167, 0.171);
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(250, 250, 250, 0.425);
  }
}
</style>
