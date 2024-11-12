import { createSlice } from '@reduxjs/toolkit'
import {
  loadUsersFromLocalStorage,
  saveUsersToLocalStorage,
} from './localStorage'

const initialState = {
  list: loadUsersFromLocalStorage(),
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.list.push(action.payload)
      saveUsersToLocalStorage(state.list)
    },
    updateUser: (state, action) => {
      const index = state.list.findIndex(
        (user) => user.id === action.payload.id
      )
      if (index !== -1) {
        state.list[index] = action.payload
        saveUsersToLocalStorage(state.list)
      }
    },
    deleteUser: (state, action) => {
      state.list = state.list.filter((user) => user.id !== action.payload)
      saveUsersToLocalStorage(state.list)
    },
  },
})

export const { addUser, updateUser, deleteUser } = usersSlice.actions
export default usersSlice.reducer
