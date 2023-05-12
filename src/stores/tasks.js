import { defineStore } from 'pinia';
import supabase from '@/supabase/index';

export default defineStore('tasks', {
  state() {
    return {
      taskList: []
    }
  },
  actions: {
    async _fetchAllTasks() {
      try {
        const { data, error } = await supabase.from('tasks').select()

        if (error) {
          throw error
        }

        console.log(data)

        this.taskList = data
      } catch (err) {
        console.log(err)
      }
    },
    async _addNewTask({ title, user_id }) {
      const { data, error } = await supabase.from('tasks').insert({ title, user_id }).select()

      if (error) {
        console.error(error)
        return
      }

      console.log('New Task ---->', data)
      this.taskList.push(...data)
    },
    async _updateTaskTitle({ newTitle, taskId }) {
      const { error } = await supabase.from('tasks').update({ title: newTitle }).eq('id', taskId)

      if (error) {
        console.error(error)
        return
      }

      const taskIndex = this.taskList.findIndex((task) => task.id === taskId)
      if (taskIndex !== -1) {
        this.taskList[taskIndex].title = newTitle;
      }
    },
    async _updateTaskState({ newState, taskId }) {
        const { error } = await supabase.from('tasks').update({ is_complete: newState }).eq('id', taskId)
  
        if (error) {
          console.error(error)
          return
        }
  
        const taskIndex = this.taskList.findIndex((task) => task.id === taskId)
        if (taskIndex !== -1) {
          this.taskList[taskIndex].is_complete = newState;
        }
      },
    async _deleteTask(taskId) {
      const { error } = await supabase.from('tasks').delete().eq('id', taskId)

      if (error) {
        console.error(error)
        return
      }

      const taskIndex = this.taskList.findIndex((task) => task.id === taskId)
      if (taskIndex !== -1) {
        this.taskList.splice(taskIndex, 1);
      }
    },
    async _deleteAllTask() {
        const { error } = await supabase.from('tasks').delete().neq('id', 0)
        if (error) {
          console.error(error)
          return
        }
        
        this.taskList = [];
    },
    }
})
