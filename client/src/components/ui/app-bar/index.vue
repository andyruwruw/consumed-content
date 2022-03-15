<template>
  <v-app-bar
    color="#343434"
    app
    dark
    flat
    :class="$style.component">
    <div class="d-flex align-center">
      <img
        :class="$style.icon"
        src="../../../assets/images/icon.svg" />

      <span
        :class="$style.title"
        @click="goHome">
        Consumed Content
      </span>
    </div>

    <v-text-field
      v-if="isLoggedIn"
      v-model="query"
      placeholder="Search..."
      outlined
      dense
      hide-details
      @keydown.enter="makeSearch" />

    <v-spacer></v-spacer>

    <v-btn
      v-if="landingPage"
      tile
      color="#E6B31D"
      @click="loginPage">
      Login
    </v-btn>

    <v-btn
      v-if="!landingPage"
      icon
      style="margin-right: 1rem;"
      color="#E6B31D"
      @click="toggleNavBar">
      <v-icon>
        mdi-menu
      </v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  mapGetters,
  mapActions,
} from 'vuex';

interface IData {
  query: string;
}

interface IMethods {
  toggleNavBar: () => void;
  search: (payload: Record<string, string | number>) => void;
  goHome: () => void;
  loginPage: () => void;
  makeSearch: () => void;
}

interface IComputed {
  isLoggedIn: boolean;
  landingPage: boolean;
}

interface IProps {
}

export default Vue.extend<IData, IMethods, IComputed, IProps>({
  name: 'AppBar',

  data: () => ({
    query: '',
  }),

  computed: {
    ...mapGetters('user', [
      'isLoggedIn',
    ]),

    landingPage() {
      return this.$route.name === 'Landing';
    },
  },

  methods: {
    ...mapActions('user', [
      'toggleNavBar',
    ]),

    ...mapActions('navigation', [
      'search',
    ]),

    goHome() {
      if (this.isLoggedIn) {
        this.$router.push('/home');
      } else {
        this.$router.push('/');
      }
    },

    loginPage() {
      this.$router.push('/login');
    },

    makeSearch() {
      this.search({
        query: this.query,
      });
    },
  },
});
</script>

<style lang="scss" module>
.component {
  position: relative;
}

.icon {
  height: 1.4rem;
  width: 1.4rem;
  margin-right: 0.5rem;
}

.title {
  color: #E6B31D;
  cursor: pointer;
  margin-right: 2rem;
}
</style>
