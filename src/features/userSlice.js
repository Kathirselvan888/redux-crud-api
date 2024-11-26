import { createSlice } from '@reduxjs/toolkit'
import { getUserFromLocalStorage, saveUserToLocalStorage } from './userApi'

const initialState = {
  users: getUserFromLocalStorage(),
  editingUser: null,
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload)
      saveUserToLocalStorage(state.users)
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload)
      saveUserToLocalStorage(state.users)
    },
    editUser: (state, action) => {
      state.editingUser = action.payload
    },
    updateUser: (state, action) => {
      const { id, updateUser } = action.payload
      const index = state.users.findIndex((user) => user.id === id)
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...updateUser }
      }
      state.editingUser = null
    },
  },
})

export default userSlice.reducer

export const { addUser, editUser, deleteUser, updateUser } = userSlice.actions
