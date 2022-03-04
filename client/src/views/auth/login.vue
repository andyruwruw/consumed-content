<template>
  <div :class="$style.component">
    <div :class="$style.content">
      <h1>
        {{ title }}
      </h1>

      <v-text-field
        v-if="isLogin === false"
        v-model="name"
        placeholder="Name"
        solo
        dark />

      <v-text-field
        v-model="username"
        placeholder="Username"
        solo
        dark />

      <v-text-field
        v-model="password"
        placeholder="Password"
        type="password"
        solo
        dark />

      <v-text-field
        v-if="isLogin === false"
        v-model="passwordCheck"
        placeholder="Re-entry Password"
        type="password"
        solo
        dark />

      <div :class="$style.actions">
        <v-btn
          color="#E6B31D"
          @click="toggleLoginRegister">
          {{ toggleButtonText }}
        </v-btn>

        <v-btn
          color="#E6B31D"
          :disabled="!valid"
          @click="execute">
          {{ submitButtonText }}
        </v-btn>
      </div>
    </div>
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
        return 'Login to you account';
      }
      return 'Join by making an account.';
    },

    toggleButtonText() {
      if (this.isLogin) {
        return 'Register Instead';
      }
      return 'Login Instead';
    },

    submitButtonText() {
      if (this.isLogin) {
        return 'Login';
      }
      return 'Register';
    },

    valid() {
      return (this.username.length > 0
        && this.password.length > 0
        && (
          this.isLogin
          || (this.passwordCheck.length > 0 && this.password === this.passwordCheck && this.name.length > 0))
      );
    },
  },
});
</script>

<style lang="scss" module>
.component {
  display: flex;
  justify-content: center;
}

.content {
  max-width: calc(100% - 2rem);
  width: 500px;
  margin: 2rem 0 5rem;

  .actions {
    display: flex;
    justify-content: space-between;
  }

  h1 {
    font-weight: 200;
    margin-bottom: 2rem;
  }

  h1,
  p {
    color: white;
  }
}
</style>
