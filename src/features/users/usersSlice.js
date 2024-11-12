// usersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import UserService from './UserService'

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  UserService.getUsers
)
export const addUser = createAsyncThunk('users/addUser', UserService.addUser)
export const updateUser = createAsyncThunk(
  'users/updateUser',
  UserService.updateUser
)
export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  UserService.deleteUser
)

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    loading: false,
    editingUserId: null, // New state for editing user ID
  },
  reducers: {
    setEditingUserId: (state, action) => {
      state.editingUserId = action.payload
    },
    resetEditingUserId: (state) => {
      state.editingUserId = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.list = action.payload
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.list.push(action.payload)
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (user) => user.id === action.payload.id
        )
        state.list[index] = action.payload
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter((user) => user.id !== action.payload)
      })
  },
})

export const { setEditingUserId, resetEditingUserId } = usersSlice.actions

export default usersSlice.reducer
