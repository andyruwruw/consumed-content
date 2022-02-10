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
      outlined
      dense
      hide-details
      placeholder="Search..." />

    <v-spacer></v-spacer>

    <v-btn
      outlined
      @click="loginPage">
      Login
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'AppBar',

  computed: {
    ...mapGetters('user', [
      'getUser',
    ]),
  },

  methods: {
    goHome() {
      if (this.getUser === null) {
        this.$router.push('/');
      }
      this.$router.push('/home');
    },

    loginPage() {
      this.$router.push('/login');
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
</style>
