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

        <v-btn
          color="#E6B31D"
          icon
          @click="interact">
          <v-icon large>
            {{ liked || category ? 'mdi-minus' : 'mdi-plus' }}
          </v-icon>
        </v-btn>
      </div>

      <span
        :class="$style.title"
        @click="goToShow">
        {{ name }}
      </span>

      <span
        v-if="genres.length > 0"
        :class="$style.genres">
        {{ genres.map(genre => genre.name).join(', ') }}
      </span>
    </div>

    <v-img
      :src="`http://image.tmdb.org/t/p/original/${image}`"
      :class="$style.image" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  mapActions,
  mapGetters,
} from 'vuex';
import { IShowGenreObject } from '../../../../../shared/types';

import api from '../../../api';

interface IData {
  genres: IShowGenreObject[],
  liked: boolean;
}

interface IMethods {
  like: (payload: Record<string, string | number>) => void;
  unlike: (payload: Record<string, string | number>) => void;
  interact: () => void;
  goToShow: () => void;
  writeReview: () => void;
}

interface IComputed {
  getSaved: Record<number, boolean>;
  isSaved: boolean;
}

interface IProps {
  id: number;
  name: string;
  released: number;
  image: string;
  padding: boolean;
  category: boolean;
}

export default Vue.extend<IData, IMethods, IComputed, IProps>({
  name: 'ShowCardItem',

  props: {
    id: {
      type: Number,
      default: 0,
    },

    name: {
      type: String,
      required: true,
    },

    released: {
      type: Number,
      required: false,
      default: -1,
    },

    image: {
      type: String,
      required: true,
    },

    padding: {
      type: Boolean,
      default: false,
    },

    category: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    liked: false,
    genres: [],
  }),

  async created() {
    this.genres = await api.show.getShowGenres(this.id);
    this.liked = this.isSaved;
  },

  computed: {
    ...mapGetters('shows', [
      'getSaved',
    ]),

    isSaved() {
      return this.id in this.getSaved && this.getSaved[this.id];
    },
  },

  methods: {
    ...mapActions('shows', [
      'like',
      'unlike',
    ]),

    goToShow() {
      this.$router.push(`/show/${this.id}`);
    },

    writeReview() {
      this.$router.push(`/review/${this.id}`);
    },

    interact() {
      if (this.category) {
        this.$emit('remove', this.id);
      } else {
        this.liked = !this.liked;
        if (!this.liked) {
          this.unlike({
            id: this.id,
          });
        } else {
          this.like({
            id: this.id,
          });
        }
      }
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
  margin: .5rem;
  text-align: center;
  width: calc(100% - 1rem);
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
