<script>
import { mapState, mapActions } from 'pinia';
import { RouterLink } from 'vue-router';
import TaskStore from '@/stores/tasks';
import UserStore from '@/stores/user';
import TaskList from '@/components/TaskList.vue';


export default {
  name: 'HomeView',
  components: {
    TaskList,
    RouterLink,
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
  <RouterLink to="/auth/sign-out">Sign Out</RouterLink>
  <div class="homeView">
    <SignOutView />
        <h1>Your Tasks List</h1>
  </div>
  <TaskList />
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
