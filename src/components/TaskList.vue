<template>
    <div class="task-container">
      <div>
        <div class="row">
          <input
            type="text"
            placeholder="New task"
            v-model="taskName"
            v-on:keyup.enter="_addNewTask()"
            v-for="todo in TaskList" :key="todo.id">{{ todo.title }}
          />
          <button type="submit" @click="$event =>_addNewTask({ title: 'New task', userId: 'this.user.id'})">Add Task</button>
          <br>
        </div>
      </div>
      <div class="row2">
        <div>
          <div v-if="tasks.length === 0">
            <p>You don't have any task yet. Add some!</p>
          </div>
          <ul class="list">
            <li class="list-item" v-for="(task, index) in tasks" v-bind:key="index">
              <span
                v-bind:class="[task.status ? 'task-completed' : '', 'cursor']"
                v-on:click="_updateTask(task)"
              >
                <i v-bind:class="[task.status ? 'fas fa-check-circle' : 'far fa-circle']"></i>
              </span>
              <h2 v-if="!task.edit">{{ task.name }}</h2>
              <input
                type="text"
                v-model="task.name"
                v-if="task.edit"
                v-on:keyup.enter="_updateTaskName(task)"
              />
              <span
                class="pointer edit"
                v-on:click="_toggleEditTask(task)"
              >
                <i class="fas fa-pen"></i>
              </span>
              <span class="pointer danger" v-on:click="_deleteTask(index)">
                <i class="fas fa-trash-alt"></i>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ToDoStore from '@/stores/tasks.js';
  import { mapActions, mapState } from 'pinia';
  import UserStore from '@/stores/user';

  export default {
    data() {
      return {
        tasks: [],
        taskName: '',
      };
    },
    computed: {
      ...mapState(UserStore, ['user'])
    },
    methods: {
      ...mapActions(ToDoStore, ['_fetchAllTasks']),
      _addNewTask() {
        const task = {
          name: this.taskName,
          status: false,
          edit: false,
        };
        this.tasks.push(task);
        this.taskName = '';
      },
      _deleteTask(index) {
        this.tasks.splice(index, 1);
      },
      _updateTask(task) {
        task.status = !task.status;
      },
      _toggleEditTask(task) {
        task.edit = !task.edit;
      },
      _updateTaskName(task) {
        task.edit = false;
      },
    },
    created() {
      this._fetchAllTasks();
    }
  };
  </script>
  
  <style scoped>

  * {
    background-color: white;
  }

  input {
    width: 65%;
    text-align: center;
    border: 2px solid black;
    border-radius: 10px;
    padding: 5px;
    background-color: lightgray;
  }

  .list-item {
    display: flex;
    justify-content: space-between;
  }

  button {
    background-color: black;
    color: white;
    width: 30%;
    padding: 8px;
    margin-left: 10px;
    border-radius: 5%;
  }

  .row {
    display: flex;
    flex-direction: row;
    width: 150%;
    margin: 20px 0px 20px 0px;
  }

  .row2 {
    width: 135%;
    margin: 20px;
  }

  ul {
    list-style-type: none;
  }
  
  .pointer {
    cursor: pointer;
    background-color: white;
  }
  
  .task-completed {
    color: black;
  }
  
  span {
    background: none;
  }
  
  .danger {
    color: red;
  }
  </style>
  