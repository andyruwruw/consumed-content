<template>
  <div :class="$style.component">
    <h1>
      {{ title}}
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
      @click="toggleLoginRegister">
      {{ toggleButtonText }}
    </v-btn>

    &nbsp;

    <v-btn
      elevation="2"
      @click="execute">
      Join
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
  name: 'Login',

  data: () => ({
    login: true,
  }),

  methods: {
    ...mapActions('user', [
      'login',
      'register',
    ]),

    execute() {
      if (this.login) {
        this.login({
          username,
          password,
        });
      } else {
        this.register({
          name, 
          username,
          password
        });
      }
    },

    toggleLoginRegister() {
      this.login = !this.login;
    },
  },

  computed: {
    title() {
      if (this.login) {
        return 'Login';
      }
      return 'Join!';
    },

    toggleButtonText() {
      if (this.login) {
        return 'Register Instead';
      }
      return 'Login Instead';
    }
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
