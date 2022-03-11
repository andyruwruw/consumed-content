<template>
  <div :class="$style.component">
    <div
      :class="$style.image"
      :style="{
        'background-image': `url('${user.imageUrl.length > 0 ? user.imageUrl : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'}')`,
      }" />

    <div :class="$style.content">
      <div :class="$style.details">
        <span
          v-if="mode === 0"
          :class="$style.name">
          {{ user.name }}
        </span>

        <v-text-field
          v-if="mode === 1"
          :value="name"
          color="#E6B31D"
          label="Name"
          hide-details
          dense
          dark
          outlined />

        <span :class="$style.username">
          {{ user.username}}
        </span>
      </div>

      <div :class="$style.actions">
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
// Packages
import Vue from 'vue';
import {
  mapActions,
  mapGetters,
} from 'vuex';

// Types
import { IPublicUserObject } from '../../../../../shared/types';

interface IData {
  mode: number;
  name: string;
  imageUrl: string;
  privateMode: boolean;
}

interface IMethods {
  updateUser: (user: Record<string, string | boolean>) => void;
  toggleMode: () => void;
  save: () => void;
}

interface IComputed {
  getUser: IPublicUserObject;
  isUser: boolean;
  actionText: string;
}

interface IProps {
  user: IPublicUserObject;
}

export default Vue.extend<IData, IMethods, IComputed, IProps>({
  name: 'ProfileHeader',

  props: {
    user: {
      type: Object as () => IPublicUserObject,
      required: true,
    },
  },

  data: () => ({
    mode: 0,

    name: '',

    imageUrl: '',

    privateMode: true,
  }),

  computed: {
    ...mapGetters('user', [
      'getUser',
    ]),

    isUser() {
      return this.user.id === this.getUser.id;
    },

    actionText() {
      return this.mode === 0 ? 'Edit' : 'Save';
    },
  },

  methods: {
    ...mapActions('user', [
      'updateUser',
    ]),

    toggleMode() {
      if (this.mode === 1) {
        this.save();
      } else {
        this.name = this.user.name;
        this.imageUrl = this.user.imageUrl;
        this.privateMode = this.user.private;
      }

      this.mode = this.mode === 0 ? 1 : 0;
    },

    save() {
      this.updateUser({
        name: this.name,
        imageUrl: this.imageUrl,
        privateMode: this.privateMode,
      });
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

.image {
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-size: 100%;
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

    .username {
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.322);
    }
  }

  .actions {
    display: flex;
    flex-direction: column;
  }
}
</style>

function moment() {
  throw new Error('Function not implemented.');
}
