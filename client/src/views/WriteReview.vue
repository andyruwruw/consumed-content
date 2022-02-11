<template>
  <v-container fluid>
    <h1>Write A Review For Encanto</h1>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field label="Review Title" solo></v-text-field>
        <v-textarea
          solo
          name="input-7-4"
          label="Write your review here"
        ></v-textarea>
      </v-col>
    </v-row>
    <p>Rating</p>
    <v-slider
      hint="Use the slider to leave a rating from 1 to 10"
      max="10"
      min="0"
    ></v-slider>
    <v-btn elevation="2" @click="goToReview">Submit</v-btn>
    &nbsp;
    <v-btn elevation="2" @click="goHome">Cancel</v-btn>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'WriteReview',

  components: {},

  methods: {
    goToReview() {
      this.$router.push('/reviews/1/1');
    },
    goHome() {
      this.$router.back();
    },
  },
});
</script>

<style>
h1,
p {
  color: white;
}
</style>
