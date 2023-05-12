<template>
  <div class="task-container">
      <div class="row">
        <input
          type="text"
          placeholder="New task"
          v-model="taskName"
          @keyup.enter="handleNewTask"
        />
        <button class="add-btn" type="submit" @click="handleNewTask">Add Task</button>
        <br />
      </div>
    <div class="row2">
      <div>
        <div v-if="taskList.length === 0">
          <p>You don't have any task yet. Add some!</p>
        </div>
        <ul class="list">
          <li class="list-item" v-for="(task, index) in taskList" :key="index">
            <button
              v-if="taskUpdate.id !== task.id"
              :class="[task.is_complete ? 'task-completed' : '', 'cursor']"
              @click="updateTaskState(task.id, task.is_complete)"
            >
              <i :class="[task.is_complete ? 'fas fa-check-circle' : 'far fa-circle']"></i>
            </button>
            <h2 v-if="taskUpdate.id !== task.id">{{ task.title }}</h2>
            <div class="edit-container"></div>
            <input class="update-input" v-if="isEditing && taskUpdate.id === task.id"
              type="text"
              v-model="taskUpdate.title"
              />
            <button class="update-btn" v-if="isEditing && taskUpdate.id === task.id" @click="_handleUpdateTask">Update!</button>
            <button class="cancel-btn" v-if="isEditing && taskUpdate.id === task.id" @click="_handleCancelUpdate">Cancel</button>
            <button v-if="taskUpdate.id !== task.id" class="pointer edit" @click="_handleEditTask(task.id, task.title)">
              <i class="fas fa-pen"></i>
            </button>
            <button v-if="taskUpdate.id !== task.id" class="pointer danger" @click="deleteTask(task.id)">
              <i class="fas fa-trash-alt"></i>
            </button>
          </li>
        </ul>
      </div>
      <div v-if="taskList.length > 0">
          <button class="delete-btn" type="submit" @click="deleteAllTask()">Delete All Tasks</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import UserStore from "@/stores/user";
import TaskStore from "@/stores/tasks";

export default {
  computed: {
    ...mapState(UserStore, ['user']),
    ...mapState(TaskStore, ['taskList'])
  },
  data() {
    return {
      taskName: '',
      isEditing: false,
      taskUpdate: {
        id: '',
        title: ''
      }
    }
  },
  methods: {
    ...mapActions(TaskStore, ['_addNewTask', '_deleteTask', '_updateTaskState', '_updateTaskTitle', '_deleteAllTask']),
    _handleEditTask(taskId, taskTitle) {
      this.taskUpdate.id = taskId;
      this.taskUpdate.title = taskTitle;
      this.isEditing = true;
    },
    _handleCancelUpdate() {
      this.taskUpdate.id = '';
      this.taskUpdate.title = '';
      this.isEditing = false;
    },
    async _handleUpdateTask() {
      const task = {
        newTitle: this.taskUpdate.title,
        taskId: this.taskUpdate.id
      };
      await this._updateTaskTitle(task);

      this.taskUpdate.id = '';
      this.taskUpdate.title = '';
      this.isEditing = false;
    },
    async handleNewTask() {
      const task = {
        title: this.taskName,
        user_id: this.user.id,
      }
      await this._addNewTask(task)
      this.taskName = '';
      console.log('user_id:', task.user_id);
    },
    async deleteTask(taskId) {
      await this._deleteTask(taskId);
    },
    async updateTaskState(taskId, taskState) {
      const data = {
        newState: !taskState,
        taskId,
      };

      await this._updateTaskState(data)
    },
    async deleteAllTask() {
      await this._deleteAllTask()
    },
  },
}
</script>

<style scoped>
* {
  background-color: white;
}

h2 {
  margin: 0 5% 0 5%;
}

input {
  display: flex;
  width: 50%;
  text-align: left;
  border: 2px solid black;
  border-radius: 10px;
  padding: 10px 10px 10px 20px;
  background-color: lightgray;
}

.update-input {
  width: 80%;
}

.list-item {
  display: flex;
  justify-content: left;
  margin-bottom: 5%;
}

.add-btn {
  background-color: black;
  color: white;
  width: 20%;
  padding: 8px;
  margin-left: 10px;
  border-radius: 10px;
  cursor: pointer;
}

.update-btn {
  background-color: #364E27;
  color: white;
  width: 15%;
  padding: 8px;
  margin-left: 10px;
  border-radius: 10px;
  cursor: pointer;
}

.cancel-btn {
  background-color: black;
  color: white;
  width: 15%;
  padding: 8px;
  margin-left: 10px;
  border-radius: 10px;
  cursor: pointer;
}

.delete-btn {
  background-color: black;
  color: white;
  width: 60%;
  padding: 8px;
  border: 2px solid black;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: left;
  text-align: center;
  cursor: pointer;
  margin-bottom: 5%;
}

.row {
  display: flex;
  flex-direction: row;
  width: 200%;
  margin-top: 20px;
}

.row2 {
  width: 135%;
  margin: 20px;
}

ul {
  list-style-type: none;
}

.cursor {
  border: none;
  cursor: pointer;
}
.pointer {
  cursor: pointer;
  background-color: white;
  border: none;
}

.fas {
  background-color: white;
  border: none;
}

.danger {
  color:#364E27;
  border: none;
  margin-left: 5%;
}

p {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
}

@media only screen and (min-width: 1000px)  and (max-width: 1500px) {
  .row {
  width: 120%;
  padding-left: 5%;
  }
  .add-btn {
  width: 15%;
}
.list-item {
  width: 80%;
  padding-left: 0%;
}

}

@media only screen and (max-width: 1000px) {
  .h {
    font-size: 14px;
  }
  .row {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin: 0;
  }

  .row2 {
  width: 100%;
  }

  input {
  margin-top: 20px;
  width: 80%;
}

.task-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.list-item {
  width: 80%;
  padding-left: 10%;
}

.update-input {
  width: 60%;
  margin-bottom: 5%;
}

  .add-btn {
  width: 80%;
  padding: 8px;
  margin-top: 5%;
  }

  .update-btn {
    width: 40%;
  }

  .delete-btn {
   width: 100%;
   margin-top: 30px;
   margin-left: 10%;
  }

  .cancel-btn {
    display: none;
  }

  p {
    text-align: center;
  }
  
  h2 {
    width: 800%;
  }
}

</style>
