import { defineStore } from "pinia";
import supabase from '@/supabase';

export default defineStore('tasks', {
    state() {
        return {
            taskList: [],
        }
    },
    actions: {
        async _fetchAllTasks() {
            try {
                const { data, error } = await supabase
                    .from('tasks')
                    .select();

                if (error) {
                    throw error;
            }

            console.log(data)

            this.taskList(data);
        } catch(err) {
            console.log(err);
            }
        },
        async _addNewTask({ title, userId }) {
            const { data, error } = await supabase
                    .from('tasks')
                    .insert({ title, user_id: userId })
                    .select();

            if (error) {
                console.error(error);
                return;
            }

            console.log('New Task ---->', data)
            this.taskList.push(...data)
        },
        async _updateTaskName() {
            const { error } = await supabase
            .from('tasks')
            .update({ name: '' })
            .eq('id', 1);

            if (error) {
                console.error(error);
                return;
            }

            this.taskList.push()
        },
        async _deleteTask() {
            const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', 1)

            if (error) {
                console.error(error);
                return;
            }

            this.taskList.push()
        },
    },
})
