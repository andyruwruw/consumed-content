<template>
  <div
    :class="[
      $style.component,
      {
        [$style.padding]: padding,
      },
    ]">
    <div :class="$style.details">
      <div :class="$style['button-wrapper']">
        <v-btn
          color="#E6B31D"
          icon
          @click="writeReview">
          <v-icon large>
            mdi-message-draw
          </v-icon>
        </v-btn>

        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="#E6B31D"
              icon
              v-bind="attrs"
              v-on="on">
              <v-icon large>
                mdi-folder-table-outline
              </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title style="cursor: pointer">Add to 'Horror' Category</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title style="cursor: pointer">Add to 'Favorites' Category</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title style="cursor: pointer">Add to 'Oldies' Category</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn
          color="#E6B31D"
          icon
          @click="interact">
          <v-icon large>
            {{ isSaved ? 'mdi-minus' : 'mdi-plus' }}
          </v-icon>
        </v-btn>
      </div>

      <span
        :class="$style.title"
        @click="goToShow">
        {{ title }}
      </span>

      <span :class="$style.genres">
        {{ genres.join(', ') }}
      </span>
    </div>

    <v-img
      :src="imageUrl"
      :class="$style.image" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ShowCardItem',

  props: {
    id: {
      type: Number,
      default: 0,
    },

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

    padding: {
      type: Boolean,
      default: false,
    },

    saved: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    isAdded: false,
  }),

  methods: {
    goToShow() {
      this.$router.push(`/show/${this.id}`);
    },

    writeReview() {
      this.$router.push(`/review/${this.id}`);
    },

    interact() {
      if (this.saved) {
        this.unlike();
      } else {
        this.like();
      }
      this.isAdded = !this.isAdded;
    },

    unlike() {
      this.$emit('unlike', this.id);
    },

    like() {
      console.log('If we had any features like that I\'d add it for you');
    },
  },

  computed: {
    isSaved() {
      return this.saved || this.isAdded;
    },
  },
});
</script>

<style lang="scss" module>
.component {
  display: flex;
  width: 12rem;
  min-width: 12rem;
  height: 20rem;
  background-size: cover;
  background-position: center;
  margin-right: 2rem;
  position: relative;

  &.padding {
    margin-bottom: 2rem;
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
  opacity: 0;
  transition: all 0.3s ease;
  background: rgba(0, 0, 0, 0.87);
}

.details:hover {
  opacity: 1;
}

.title {
  color: white;
  font-size: 1.2rem;
  text-align: center;
  width: 100%;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.genres {
  color: rgba(255, 255, 255, 0.568);
}

.button-wrapper {
  position: absolute;
  left: 1rem;
  display: flex;
  justify-content: space-between;
  right: 1rem;
  top: 1rem;
}
</style>
