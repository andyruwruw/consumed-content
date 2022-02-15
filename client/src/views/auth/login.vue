<template>
  <div :class="$style.component">
    <h1>
      Login or Join
    </h1>

    <p>
      No information needed! Just click the button below to login to a test account.
    </p>

    <v-row>
      <v-col
        cols="12"
        md="6">
        <v-text-field
          label="User Name"
          solo />
        <v-text-field
          label="Password"
          solo />
      </v-col>
    </v-row>

    <v-btn
      elevation="2"
      @click="goHome">
      Login
    </v-btn>

    &nbsp;

    <v-btn
      elevation="2"
      @click="goHome">
      Join
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Login',

  methods: {
    goHome() {
      this.$router.push('/home');
    },
  },
});
</script>

<style lang="scss" module>
.component {
  h1,
  p {
    color: white;
  }
}
</style>
