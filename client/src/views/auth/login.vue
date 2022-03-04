<template>
  <div :class="$style.component">
    <h1>
      {{ title }}
    </h1>

    <v-text-field
      v-if="isLogin === false"
      v-model="name"
      label="Name"
      solo />

    <v-text-field
      v-model="username"
      label="Username"
      solo />

    <v-text-field
      v-model="password"
      label="Password"
      solo />

    <v-text-field
      v-if="isLogin === false"
      v-model="passwordCheck"
      label="Re-entry Password"
      solo />

    <v-btn
      elevation="2"
      @click="toggleLoginRegister">
      {{ toggleButtonText }}
    </v-btn>

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
    isLogin: true,

    username: '',

    password: '',

    passwordCheck: '',

    name: '',
  }),

  methods: {
    ...mapActions('user', [
      'login',
      'register',
    ]),

    execute() {
      if (this.isLogin) {
        this.login({
          username: this.username,
          password: this.password,
        });
      } else {
        this.register({
          name: this.name,
          username: this.username,
          password: this.password,
        });
      }
    },

    toggleLoginRegister() {
      this.isLogin = !this.isLogin;
    },
  },

  computed: {
    title() {
      if (this.isLogin) {
        return 'Login';
      }
      return 'Join!';
    },

    toggleButtonText() {
      if (this.isLogin) {
        return 'Register Instead';
      }
      return 'Login Instead';
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
