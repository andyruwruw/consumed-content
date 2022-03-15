<template>
  <div :class="$style.component">
    <div :class="$style.content">
      <div :class="$style.details">
        <span
          v-if="category !== null && mode === 0"
          :class="$style.name">
          {{ category.name }}
        </span>

        <v-text-field
          v-if="category !== null && mode === 1"
          v-model="name"
          style="flex: none"
          color="#E6B31D"
          hide-details
          dense
          dark
          outlined />

        <span
          v-if="category !== null && mode === 0"
          :class="$style.description">
          {{ category.description }}
        </span>

        <v-text-field
          v-if="category !== null && mode === 1"
          v-model="description"
          style="flex: none; margin-top: .5rem;"
          color="#E6B31D"
          placeholder="No Description"
          hide-details
          dense
          dark
          outlined />
      </div>

      <div :class="$style.actions">
        <v-btn
          color="#E6B31D"
          style="margin-right:2rem;"
          dark
          outlined
          @click="deleteCategory">
          Delete
        </v-btn>

        <v-btn
          color="#E6B31D"
          dark
          :outlined="mode === 0"
          @click="toggleMode">
          {{ actionText }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import {
  ICategoryShowObject,
  IUserCategoryObject,
} from '../../../../../shared/types';
import api from '../../../api';

interface IData {
  mode: number;
  name: string;
  description: string;
}

interface IMethods {
  goToHome: () => void;
  toggleMode: () => void;
  save: () => Promise<void>;
  deleteCategory: () => Promise<void>;
}

interface IComputed {
  actionText: string;
}

interface IProps {
  category: IUserCategoryObject | null,
  shows: ICategoryShowObject[],
}

export default Vue.extend<IData, IMethods, IComputed, IProps>({
  name: 'CategoryHeader',

  props: {
    category: {
      type: Object,
      default: null,
    },

    shows: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    mode: 0,

    name: '',
    description: '',
  }),

  computed: {
    actionText() {
      return this.mode === 0 ? 'Edit' : 'Save';
    },
  },

  methods: {
    ...mapActions('navigation', [
      'goToHome',
    ]),

    toggleMode() {
      if (this.mode === 1) {
        this.save();
      } else if (this.category) {
        this.name = this.category.name;
        this.description = this.category.description;
      }

      this.mode = this.mode === 0 ? 1 : 0;
    },

    async save() {
      if (this.category && 'id' in this.category) {
        await api.category.edit(
          this.category.id,
          this.name,
          this.description,
        );
      }

      this.$emit('edited');
    },

    async deleteCategory() {
      if (this.category && 'id' in this.category) {
        await api.category.deleteOne(this.category.id);
      }

      this.goToHome();
    },
  },
});
</script>

<style lang="scss" module>
.component {
  display: flex;
  background: #2E2E2E;
  padding: 2rem;
  width: 100%;
  height: 150px;
  align-items: center;
}

.content {
  display: flex;
  justify-content: space-between;
  margin: 0 1rem;
  height: 100%;
  width: calc(100% - 100px - 2rem);

  .details {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .name {
      font-size: 1.2rem;
      font-weight: light;
      color: #fff;
    }

    .description {
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.322);
    }
  }

  .actions {
    display: flex;
  }
}
</style>
