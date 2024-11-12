import axios from 'axios'

const API_URL = 'http://localhost:5000/users'

const getUsers = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

const addUser = async (user) => {
  const response = await axios.post(API_URL, user)
  return response.data
}

const updateUser = async (user) => {
  const response = await axios.put(`${API_URL}/${user.id}`, user)
  return response.data
}

const deleteUser = async (id) => {
  await axios.delete(`${API_URL}/${id}`)
  return id
}

export default {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
}
