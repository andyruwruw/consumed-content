<template>
  <div :class="$style.component">
    <v-btn
      color="#E6B31D"
      width="100%"
      dark
      @click="goToProfile">
      My Profile
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'NavigationDrawerMyProfileButton',

  computed: {
    ...mapGetters('user', [
      'getUser',
      'isLoggedIn',
    ]),
  },

  methods: {
    goToProfile() {
      if (this.isLoggedIn) {
        this.$router.push(`/profile/${this.getUser.id}`);
      }
    },
  },
});
</script>

<style lang="scss" module>
.component {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem;
}

.image {
  $image-size: 5rem;
  display: block;
  height: $image-size;
  width: $image-size;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  margin-bottom: 1rem;
}

.name {
  color: #FFFFFF;
  font-size: 1.2rem;
  margin-bottom: 0.2rem;
}

.username {
  color: #6F6F6F;
}
</style>
