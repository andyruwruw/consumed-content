<template>
  <v-app-bar
    color="#343434"
    app
    dark
    flat>
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
      outlined
      dense
      hide-details
      placeholder="Search..."
      @focus="open"
      @blur="close" />

    <div
      v-if="searchOpen"
      :class="$style['search-results']">
      <h1>
        Search Results for 'Spiderman'
      </h1>

      <show-list />
    </div>

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
import { mapGetters, mapActions } from 'vuex';

import ShowList from '../show-list/show-list.vue';

export default Vue.extend({
  name: 'AppBar',

  components: {
    ShowList,
  },

  computed: {
    ...mapGetters('user', [
      'isLoggedIn',
    ]),

    landingPage() {
      return this.$route.name === 'Landing';
    },
  },

  data: () => ({
    searchOpen: false,
  }),

  methods: {
    ...mapActions('user', [
      'toggleNavBar',
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

    open() {
      this.searchOpen = true;
    },

    close() {
      this.searchOpen = false;
    },
  },
});
</script>

<style lang="scss" module>
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

.search-results {
  position: fixed;
  display: block;
  top: 64px;
  left: 0;
  width: calc(100% - 2rem);
  max-width: 800px;
  height: 50vh;
  background: rgba(0, 0, 0, 0.822);
  padding: 1rem;
}
</style>
