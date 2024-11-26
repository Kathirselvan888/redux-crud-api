// src/App.js
import Users from './features/users/Users'

function App() {
return (

<div className='App'>
<h1>React CRUD with Redux Toolkit & Local Storage</h1>
<Users />
</div>
)
}

export default App

import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addUser, updateUser } from './usersSlice'

const UserForm = ({ editingUser, onFormReset }) => {
const [user, setUser] = useState({
id: null,
name: '',
email: '',
agreed: false,
})
const dispatch = useDispatch()

// Update `user` state whenever `editingUser` changes
useEffect(() => {
if (editingUser) {
setUser(editingUser)
} else {
setUser({ id: null, name: '', email: '', agreed: false })
}
}, [editingUser])

const handleChange = (e) => {
const { name, value, type, checked } = e.target
setUser({ ...user, [name]: type === 'checkbox' ? checked : value })
}

const handleSubmit = (e) => {
e.preventDefault()
if (user.id) {
dispatch(updateUser({ id: user.id, updatedUser: user }))
} else {
dispatch(addUser({ ...user, id: Date.now() }))
}
onFormReset()
setUser({ id: null, name: '', email: '', agreed: false })
}

return (

<form onSubmit={handleSubmit}>
<input
        name='name'
        value={user.name}
        onChange={handleChange}
        placeholder='Name'
        required
      />
<input
        name='email'
        value={user.email}
        onChange={handleChange}
        placeholder='Email'
        required
      />
<label>
<input
          type='checkbox'
          name='agreed'
          checked={user.agreed}
          onChange={handleChange}
        />
Agree to terms
</label>
<button type='submit'>{user.id ? 'Update User' : 'Add User'}</button>
</form>
)
}

export default UserForm

import { useSelector, useDispatch } from 'react-redux'
import { deleteUser } from './usersSlice'
import UserForm from './UserForm'
import { useState } from 'react'

const Users = () => {
const users = useSelector((state) => state.users.users)
const dispatch = useDispatch()

const [editingUser, setEditingUser] = useState(null)

const handleDelete = (id) => {
dispatch(deleteUser(id))
}

const handleEdit = (user) => {
console.log(user, 'hi')
setEditingUser(user)
}

const resetForm = () => {
setEditingUser(null)
}

return (

<div>
<h2>User Management</h2>
<UserForm editingUser={editingUser} onFormReset={resetForm} />
{users.length === 0 ? (
<p>No users available.</p>
) : (
<ul>
{users.map((user) => (
<li key={user.id}>
<p>
{user.name} - {user.email}
</p>
<button onClick={() => handleDelete(user.id)}>Delete</button>
<button onClick={() => handleEdit(user)}>Edit</button>
</li>
))}
</ul>
)}
</div>
)
}

export default Users

const getUsersFromLocalstorage = () => {
const users = localStorage.getItem('users')
return users ? JSON.parse(users) : []
}

const saveUsersToLocalstorage = (users) => {
localStorage.setItem('users', JSON.stringify(users))
}

export { getUsersFromLocalstorage, saveUsersToLocalstorage }

import { createSlice } from '@reduxjs/toolkit'
import { getUsersFromLocalstorage, saveUsersToLocalstorage } from './usersApi'

const initialState = {
users: getUsersFromLocalstorage(),
}

const usersSlice = createSlice({
name: 'users',
initialState,
reducers: {
addUser: (state, action) => {
state.users.push(action.payload)
saveUsersToLocalstorage(state.users)
},
updateUser: (state, action) => {
const { id, updatedUser } = action.payload
const index = state.users.findIndex((user) => user.id === id)
if (index !== -1) {
state.users[index] = { ...state.users[index], ...updatedUser }
saveUsersToLocalstorage(state.users)
}
},
deleteUser: (state, action) => {
state.users = state.users.filter((user) => user.id !== action.payload)
saveUsersToLocalstorage(state.users)
},
setEditingUser: (state, action) => {
state.editingUser = action.payload
},
clearEditingUser: (state) => {
state.editingUser = null
},
},
})

export const {
addUser,
updateUser,
deleteUser,
editingUser,
clearEditingUser,
} = usersSlice.actions
export default usersSlice.reducer

// src/app/store.js
import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../features/users/usersSlice'

export const store = configureStore({
reducer: {
users: usersReducer,
},
})

export default store
