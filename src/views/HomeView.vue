<script>
import { mapState, mapActions } from 'pinia';
import TaskStore from '@/stores/tasks';
import UserStore from '@/stores/user';
import TaskList from '@/components/TaskList.vue';

export default {
  name: 'HomeView',
  components: {
    TaskList,
  },
  data() {
    return {
      taskTitle: '',
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
  <div class="home-view">
    <h1>Your Tasks List</h1>
    <TaskList />
  </div>
  <button @click="handleSignOut" type="submit" class="sign-out-btn">Sign Out</button>
</template>

<style scoped>

.home-view {
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;
  border: 2px solid black;
  border-radius: 10px;
  width: 100%;
  box-shadow: 5px 5px 10px 5px #364E27;
}

h1 {
  background-color: white;
  margin-top: 2%;
}

.sign-out-btn {
  width: 10%;
  text-align: center;
  border: 2px solid black;
  border-radius: 10px;
  padding: 8px;
  background-color: black;
  margin: 4% 0 0 65%;
  box-shadow: 5px 5px 10px 5px #364E27;
  color: white;
  cursor: pointer;
  margin-bottom: 1%;
  }

  @media only screen and (max-width: 1000px) {
  .home-view {
  padding: 0%;
  margin: 5%;
  margin-bottom: 0;
  width: 90%;
  }
}

h1 {
  margin-top: 5%;
}

.sign-out-btn {
  width: 25%;
  margin-left: 65%;
  }
</style>
