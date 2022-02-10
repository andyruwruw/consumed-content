<template>
  <v-container fluid>
    <h1>Login or Join</h1>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field label="User Name" solo></v-text-field>
        <v-text-field label="Password" solo></v-text-field>
      </v-col>
    </v-row>
    <v-btn elevation="2">Login</v-btn>
    &nbsp;
    <v-btn elevation="2">Join</v-btn>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Login',

  components: {},
});
</script>

<style>
h1,
p {
  color: white;
}
</style>
