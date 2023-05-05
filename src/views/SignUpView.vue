<template>
    <h1>Organize Your Tasks with AItask</h1>
    <form>
      <div>
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" />
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" />
      </div>
      <div class="auth-buttons">
        <button @click="handleSignUp">Sign Up</button>
        <button><RouterLink to="/auth/sign-in">Sign In</RouterLink></button>
      </div>
    </form> 
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/stores/user.js';

export default {
    name: 'AuthView',
    computed: {
      ...mapState(userStore, ['user']),
    },
    methods: {
      ...mapActions(userStore, ['signUp']),
      handleSignUp() {
        const userData = {
          email: '',
          password: '',
        };
        this.signUp(userData);
      },
    }
};
</script>

<style>
</style>