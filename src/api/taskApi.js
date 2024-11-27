import axios from 'axios'

const API_URL = 'http://localhost:5000/api/v1/tasks'

export const fecthTasks = () => axios.get(API_URL)
export const createTask = (task) => axios.post(API_URL, task)
export const updateTask = (id, task) => axios.put(`${API_URL}/${id}`, task)
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`)
