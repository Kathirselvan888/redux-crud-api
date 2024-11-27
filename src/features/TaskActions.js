import { createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api/taskApi'

export const fetchTasksAsync = createAsyncThunk('tasks/fetchTask', async () => {
  const res = await api.fecthTasks()
  return res.data
})

export const createTaskAsync = createAsyncThunk(
  'tasks/createTask',
  async (task) => {
    const res = await api.createTask(task)
    return res.data
  }
)

export const updateTaskAsync = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, task }) => {
    const res = await api.updateTask(id, task)
    return res.data
  }
)

export const deleteTaskAsync = createAsyncThunk(
  'tasks/deleteTask',
  async (id) => {
    await api.deleteTask(id)
    return id
  }
)
