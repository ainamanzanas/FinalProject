<script>
import { mapState, mapActions } from 'pinia'
import userStore from '@/stores/user'

export default {
  name: 'SignIn',
  data() {
    return {
      email: this.email,
      password: this.password
    }
  },
  computed: {
    ...mapState(userStore, ['user'])
  },
  methods: {
    ...mapActions(userStore, ['signIn']),

    async handleSignIn() {
      try {
        const userData = {
          email: this.email,
          password: this.password
        }
        await this.signIn(userData)
        this.successMessage = 'Welcome Back'
        this.$router.push({ name: 'home' })
      } catch (err) {
        console.log(err)
        this.successMessage = false
      }
    }
  },
}
</script>

<template>
  <div class="sign-in-view">
    <h1>Organize Your Tasks with AItask</h1>
    <form @submit.prevent>
      <div class="form-section">
        <label for="email">Email:</label>
        <input id="email" type="email" v-model="email" required />
      </div>
      <div class="form-section">
        <label for="password">Password:</label>
        <input id="password" type="password" v-model="password" required />
      </div>
      <div class="auth-buttons">
        <button class="sign-in-btn" @click="handleSignIn" type="submit">Sign In</button>
        <button class="sign-up-btn" ><RouterLink to="/auth/sign-up" class="router-link">Sign Up</RouterLink></button>
      </div>
    </form>
    <p v-if="successMessage !== false">{{ successMessage }}</p>
  </div>
</template>

<style scoped>
.sign-in-view {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  padding: 5px;
  border: 2px solid black;
  border-radius: 10px;
  box-shadow: 5px 5px 10px 5px #364E27;
}

h1 {
  background-color: white;
  padding-top: 1%;
}

input {
  width: 65%;
  text-align: center;
  border: 2px solid black;
  border-radius: 10px;
  padding: 5px;
  background-color: lightgray;
  margin-left: 2%;
  margin-bottom: 2%;
}

form {
  display: flex;
  align-items: left;
  justify-content: left;
  flex-direction: column;
  background-color: white;
}

div,
label {
  background-color: white;
}

.form-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
}


.auth-buttons {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
}

button {
  margin: 5%;
  padding: 5%;
  width: 40%;
  text-align: center;
  border: 2px solid black;
  border-radius: 10px;
}

.router-link {
  background-color: black;
  color: white;
  text-decoration: none;
}

.sign-up-btn {
  background-color: black;
  color: white;
  cursor: pointer;
}

@media only screen and (max-width: 1000px) {
  .sign-in-view {
  padding: 5%;
  margin: 5%;
  }
}

h1 {
  text-align: center;
}

</style>
