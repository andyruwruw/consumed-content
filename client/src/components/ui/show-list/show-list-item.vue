<template>
  <div :class="$style.component">
    <div :class="$style['image-wrapper']">
      <v-img
        :src="`http://image.tmdb.org/t/p/original${image}`"
        :class="$style.image"
        width="90px"
        height="90px" />
    </div>

    <div :class="$style.content">
      <div :class="$style.details">
        <span
          :class="$style.title"
          @click="goToShow">
          {{ name }}
        </span>

        <span :class="$style.genres">
          {{ genres.map(genre => genre.name).join(', ') }}
        </span>
      </div>

      <div :class="$style.actions">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
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
}

export default Vue.extend<IData, IMethods, IComputed, IProps>({
  name: 'ShowListItem',

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
    },
  },
});
</script>

<style lang="scss" module>
.component {
  display: flex;
  margin: 1rem 0rem;
  width: 100%;
  z-index: 100;
  background: #2E2E2E;
}

.content {
  display: flex;
  justify-content: space-between;
}

.details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.image-wrapper {
  display: block !important;
  height: 90px !important;
  width: 90px !important;
  margin-right: 1rem;
}

.image {
  background-size: 100% auto;
}

.title {
  color: white;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}

.actions {
  display: flex;
}

.genres {
  color: rgba(255, 255, 255, 0.322);
}
</style>
