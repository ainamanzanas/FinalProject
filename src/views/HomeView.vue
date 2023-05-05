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
      newTaskTitle: '',
    }
  },
  computed: {
    ...mapState(TaskStore, ['tasksList']),
    ...mapState(UserStore, ['user'])
    },
  methods: {
    ...mapActions(TaskStore, ['_addNewTask','_fetchAllTasks']),
    ...mapActions(UserStore, ['signOut']),
  },
  created() {
    this._fetchAllTasks()
  },
}
</script>

<template>
  <main class="homeView">
    <h1>Your Tasks List</h1>
    <TaskList />
    <button @click="signOut">Sign Out</button>
  </main>
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
}

h1 {
    background-color: white;
}

</style>
