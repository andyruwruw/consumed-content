<template>
  <div
    :class="[
      $style.component,
      {
        [$style.padding]: padding,
      },
    ]">
    <div :class="$style.details">
      <span>
        <v-icon
          v-for="number in 10"
          :key="`star-${number}-${id}`"
          color="#E6B31D"
          small>
          {{ number > rating ? 'mdi-star-outline' : 'mdi-star' }}
        </v-icon>
      </span>

      <span
        :class="$style.username"
        @click="goToUser">
        {{ username }}
      </span>

      <v-img
        :src="userImage || 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'"
        :class="$style.image" />

      <p
        style="padding-top: .5rem"
        :class="$style.title"
        @click="goToReview">
        {{ name }}
      </p>

      <p :class="$style.description">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ShowCardItem',

  props: {
    id: {
      type: Number,
      required: true,
    },

    showId: {
      type: Number,
      required: true,
    },

    userId: {
      type: Number,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    userImage: {
      type: String,
      required: true,
    },

    created: {
      type: Number,
      default: 0,
    },

    padding: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    goToUser() {
      this.$router.push(`/profile/${this.userId}`);
    },
    goToReview() {
      this.$router.push(`/review/${this.showId}/${this.id}`);
    },
  },
});
</script>

<style lang="scss" module>
.component {
  display: flex;
  min-width: 250px;
  height: 18rem;
  background-size: cover;
  background-position: center;
  margin-right: 2rem;
  position: relative;

  &.padding {
    margin-bottom: 2rem;
  }
}

.details {
  background: #2E2E2E;
  width: 100%;
  display: block;
  height: 100%;
  padding: 1rem;
  position: relative;
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

.image {
  display: block;
  width: 3rem;
  height: 3rem;
  position: absolute;
  right: 1rem;
  top: 1rem;
  border-radius: 50%;
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
  color: rgba(255, 255, 255, 0.384);
  max-height: 8rem;
  font-weight: 200;
}

.genres {
  color: rgba(255, 255, 255, 0.568);
}

.button-wrapper {
  position: absolute;
  right: 1rem;
  top: 1rem;
}

.username {
  color: rgba(255, 255, 255, 0.349);
  font-weight: 200;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}
</style>
