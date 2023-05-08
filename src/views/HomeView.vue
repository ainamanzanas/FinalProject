<script>
import { mapState, mapActions } from 'pinia'
import TaskStore from '@/stores/tasks'
import UserStore from '@/stores/user'

export default {
  name: 'HomeView',
  //components: {
  // },
  data() {
    return {
      newTaskTitle: '',
    }
  },
  computed: {
    ...mapState(TaskStore, ['tasksList']),
    ...mapState(UserStore, ['user'])
  },
  methods: {
    ...mapActions(TaskStore, ['_addNewTask', '_fetchAllTasks']),
    ...mapActions(UserStore, ['signOut']),

    async handleSignOut() {
      try {
        await this.signOut()
        this.$router.push({ name: 'signIn' })
      } catch (err) {
        console.error(err)
      }
    }
  },
  created() {
    this._fetchAllTasks()
  }
}
</script>

<template>
  <div class="homeView">
    <h1>Your Tasks List</h1>
  </div>
  <button @click="handleSignOut" type="submit" class="sign-out-btn">Sign Out</button>
</template>

<style scoped>
.homeView {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  padding: 5px;
  border: 2px solid black;
  border-radius: 10px;
  width: 100%;
}

h1 {
  background-color: white;
}

.sign-out-btn {
  font-weight: bold;
  width: 25%;
  text-align: center;
  border: 2px solid black;
  border-radius: 10px;
  padding: 5px;
  background-color: lightgray;
  margin: 5%;
}
</style>
