<template>
  <div
    :class="$style.component"
    :style="{
      'background-image': `url('${backdropUrl}')`,
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
        <span :class="[$style.duration, $style['detail-item']]">
          {{ duration }}
        </span>

        <span :class="[$style.genres, $style['detail-item']]">
          {{ genres.join(', ') }}
        </span>

        <span :class="[$style.released, $style['detail-item']]">
          {{ releaseDate }}
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

interface IData {
}

interface IMethods {
  clicked: () => void;
}

interface IComputed {
}

interface IProps {
  id: number;
  name: string;
  posterUrl: string;
  backdropUrl: string;
  releaseDate: number;
  overview: string;
  genres: string[];
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

    posterUrl: {
      type: String,
      required: true,
    },

    backdropUrl: {
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

    genres: {
      type: Array,
      required: true,
    },
  },

  methods: {
    clicked() {
      this.$router.push(`/show/${this.name}`);
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
