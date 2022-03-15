<template>
  <div
    :class="[
      $style.component,
      {
        [$style.padding]: padding,
      },
    ]">
    <div :class="$style['image-wrapper']">
      <v-img
        :src="`http://image.tmdb.org/t/p/original${image}`"
        :class="$style.image"
        height="18rem" />
    </div>

    <div :class="$style.details">
      <p
        :class="$style.title"
        @click="goToShow">
        {{ name }}
      </p>

      <p
        :class="$style['movie-title']"
        @click="goToShow">
        {{ showName }}
      </p>

      <span>
        <v-icon
          v-for="number in 10"
          :key="`star-${number}-${id}`"
          color="#E6B31D"
          small>
          {{ number > rating ? 'mdi-star-outline' : 'mdi-star' }}
        </v-icon>
      </span>

      <p :class="$style.description">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ReviewCardItem',

  props: {
    id: {
      type: Number,
      default: 0,
    },

    name: {
      type: String,
      required: true,
    },

    showId: {
      type: Number,
      default: 0,
    },

    showName: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    padding: {
      type: Boolean,
      default: false,
    },

    rating: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
      required: true,
    },
  },

  methods: {
    goToShow() {
      this.$router.push(`/show/${this.showId}`);
    },
  },
});
</script>

<style lang="scss" module>
.component {
  display: flex;
  width: calc(33% - 2rem);
  min-width: 29rem;
  height: 18rem;
  background-size: cover;
  background-position: center;
  margin-right: 2rem;
  position: relative;

  &.padding {
    margin-bottom: 2rem;
  }
}

.image-wrapper {
  display: block;
  width: 40%;
  height: 18rem;
}

.details {
  background: #2E2E2E;
  width: 60%;
  display: block;
  height: 100%;
  padding: 1rem;
}

.title {
  color: white;
  font-size: 1.2rem;
  width: 100%;
  margin-bottom: 0 !important;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.movie-title {
  color: rgba(255, 255, 255, 0.322);
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}

.description {
  margin-top: 1rem;
  color: rgba(255, 255, 255, 0.555);
  max-height: 8rem;
  overflow: auto;
  text-overflow: ellipsis;

  &::-webkit-scrollbar {
    width: 4px;
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

.genres {
  color: rgba(255, 255, 255, 0.568);
}

.button-wrapper {
  position: absolute;
  right: 1rem;
  top: 1rem;
}
</style>
