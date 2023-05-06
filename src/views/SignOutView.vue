<template>
    <div class="sign-out-view">
    <h2>You sure you want to sign out?</h2>
    <button @click="handleSignOut" type="submit">Sign Out</button>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/stores/user.js';

export default {
    name: 'SignOut',
    computed: {
      ...mapState(userStore, ['user']),
    },
    methods: {
      ...mapActions(userStore, ['signOut']),

      handleSignOut() {

        this.signOut()
        this.$router.push({ path: '/auth'})
      },
    },
}
</script>

<style scoped>
.sign-out-view {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  padding: 5px;
  border: 2px solid black;
  border-radius: 10px;
}
h1 {
    background-color: white;
    padding: 1%;
}
</style>