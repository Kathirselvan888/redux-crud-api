import { createSlice } from '@reduxjs/toolkit'
import {
  createTaskAsync,
  deleteTaskAsync,
  fetchTasksAsync,
  updateTaskAsync,
} from './TaskActions'

const initialState = {
  tasks: { tasks: [] },
  loading: false,
  error: null,
  editTask: null,
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    editingTask: (state, action) => {
      state.editTask = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksAsync.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchTasksAsync.fulfilled, (state, action) => {
        state.loading = false
        state.tasks.tasks = action.payload.tasks // Ensure it matches your data structure
      })
      .addCase(fetchTasksAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(createTaskAsync.fulfilled, (state, action) => {
        state.tasks.tasks.push(action.payload.task) // Update the nested tasks array
      })
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        console.log(action.payload.task)
        const index = state.tasks.tasks.findIndex(
          (task) => task._id === action.payload._id
        )
        if (index !== -1) {
          state.tasks.tasks[index] = action.payload
        }
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.tasks.tasks = state.tasks.tasks.filter(
          (task) => task._id !== action.payload
        )
      })
  },
})

export const { editingTask } = taskSlice.actions

export default taskSlice.reducer
