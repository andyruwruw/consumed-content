<template>
  <div
    :class="$style.component"
    :style="{
      'background-image': `url('http://image.tmdb.org/t/p/original/${image}')`,
    }">
    <div :class="$style.content">
      <div :class="$style.header">
        <span :class="$style.title">
          {{ name }}
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
        <span :class="[$style.released, $style['detail-item']]">
          {{ releaseDateFormated }}
        </span>

        <span :class="[$style.genres, $style['detail-item']]">
          {{ genres.map(genre => genre.name).join(', ') }}
        </span>
      </div>

      <span :class="$style.description">
        {{ overview }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import moment from 'moment';

import api from '../../../api';
import { IShowGenreObject } from '../../../../../shared/types';

interface IData {
  genres: IShowGenreObject[];
}

interface IMethods {
  clicked: () => void;
}

interface IComputed {
  releaseDateFormated: string;
}

interface IProps {
  id: number;
  name: string;
  image: string;
  releaseDate: number;
  overview: string;
}

export default Vue.extend<IData, IMethods, IComputed, IProps>({
  name: 'MovieFeature',

  props: {
    id: {
      type: Number,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    releaseDate: {
      type: Number,
      required: true,
    },

    overview: {
      type: String,
      required: true,
    },
  },

  methods: {
    clicked() {
      this.$router.push(`/show/${this.name}`);
    },
  },

  data: () => ({
    genres: [] as IShowGenreObject[],
  }),

  async created() {
    this.genres = await api.show.getShowGenres(this.id);
  },

  computed: {
    releaseDateFormated() {
      return moment(this.releaseDate).format('MMMM Do YYYY');
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
  display: block;
  font-size: .9rem;
  color: rgba(255, 255, 255, 0.726);
  width: 100%;
  height: calc(100% - 40px - 43.2px);
  overflow: auto;

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
