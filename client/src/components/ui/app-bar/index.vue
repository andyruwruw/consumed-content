<template>
  <v-app-bar
    app
    color="#E6B31E"
    dark>
    <div class="d-flex align-center">
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

export default Vue.extend({
  name: 'AppBar',

  methods: {
    goHome() {
      this.$router.push('/');
    },

    loginPage() {
      this.$router.push('/login');
    },
  },
});
</script>

<style lang="scss" module>
.title {
  cursor: pointer;
  margin-right: 2rem;
}
</style>
