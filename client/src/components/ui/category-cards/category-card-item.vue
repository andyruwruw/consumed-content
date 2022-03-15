<template>
  <div
    :class="[
      $style.component,
      {
        [$style.padding]: padding,
      },
    ]"
    @click="goToCategory">
    <div
      :style="{
        'display': showOverlay ? 'flex' : 'none',
      }"
      :class="$style.add">
      <v-icon dark x-large>
        mdi-plus
      </v-icon>
    </div>

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
        v-if="images.length > 0"
        :class="$style.image"
        :style="{ backgroundImage: `url('http://image.tmdb.org/t/p/original/${images[0]}')` }" />

      <div
        v-if="images.length > 0"
        :class="$style.image"
        :style="{ backgroundImage: `url('http://image.tmdb.org/t/p/original/${images[1]}')` }" />

      <div
        v-if="images.length > 0"
        :class="$style.image"
        :style="{ backgroundImage: `url('http://image.tmdb.org/t/p/original/${images[2]}')` }" />

      <div
        v-if="images.length > 0"
        :class="$style.image"
        :style="{ backgroundImage: `url('http://image.tmdb.org/t/p/original/${images[3]}')` }" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ICategoryShowObject } from '../../../../../shared/types';
import api from '../../../api';

interface IData {
  shows: ICategoryShowObject[]
}

interface IMethods {
  goToCategory: () => void;
}

interface IComputed {
  images: string[];
  showOverlay: boolean;
}

interface IProps {
  id: number;
  created: number;
  description: string;
  imageUrl: string;
  name: string;
  userId: number;
  username: string;
  padding: boolean;add: boolean;
  relevantId: number;
}

export default Vue.extend<IData, IMethods, IComputed, IProps>({
  name: 'CategoryCardItem',

  props: {
    id: {
      type: Number,
      default: 0,
    },

    created: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
      default: '',
    },

    imageUrl: {
      type: String,
      default: '',
    },

    name: {
      type: String,
      required: true,
    },

    userId: {
      type: Number,
      default: -1,
    },

    username: {
      type: String,
      default: 'Unknown',
    },

    padding: {
      type: Boolean,
      default: false,
    },

    add: {
      type: Boolean,
      default: false,
    },

    relevantId: {
      type: Number,
      default: -1,
    },
  },

  data: () => ({
    shows: [] as ICategoryShowObject[],
  }),

  async created() {
    this.shows = await api.category.getShows(this.id);
  },

  methods: {
    goToCategory() {
      if (this.add) {
        this.$emit('add', this.id);
      } else {
        this.$router.push(`/category/${this.id}`);
      }
    },
  },

  computed: {
    images() {
      if (this.shows.length < 4) {
        const images = [];

        for (let i = 0; i < 4; i += 1) {
          if (this.shows[i % this.shows.length] && 'posterUrl' in this.shows[i % this.shows.length]) {
            images.push(this.shows[i % this.shows.length].posterUrl);
          }
        }

        return images;
      }
      return this.shows.map((show) => show.posterUrl || '');
    },

    showOverlay() {
      return this.add && !(this.shows.map((show) => show.id).includes(this.relevantId));
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

.add {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  background: rgba(3, 3, 3, 0.534);
  z-index: 100;
  transition: all .2s ease;

  &:hover {
    opacity: 1;
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
