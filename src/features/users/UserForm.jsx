// UserForm.js
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addUser,
  updateUser,
  setEditingUserId,
  resetEditingUserId,
} from './usersSlice'

const UserForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()
  const editingUserId = useSelector((state) => state.users.editingUserId)
  const users = useSelector((state) => state.users.list)
  const userToEdit = users.find((user) => user.id === editingUserId)

  useEffect(() => {
    if (userToEdit) {
      setName(userToEdit.name)
      setEmail(userToEdit.email)
      setIsAdmin(userToEdit.isAdmin)
    } else {
      resetForm()
    }
  }, [editingUserId, userToEdit])

  const resetForm = () => {
    setName('')
    setEmail('')
    setIsAdmin(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingUserId) {
      dispatch(updateUser({ id: editingUserId, name, email, isAdmin }))
    } else {
      dispatch(addUser({ name, email, isAdmin }))
    }
    resetForm()
    dispatch(resetEditingUserId()) // Reset the editingUserId after submission
  }

  return (
    <form onSubmit={handleSubmit} className='container mt-3'>
      <h2>{editingUserId ? 'Edit User' : 'Add User'}</h2>
      <div className='form-group'>
        <label>Name</label>
        <input
          type='text'
          className='form-control'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className='form-group'>
        <label>Email</label>
        <input
          type='email'
          className='form-control'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className='form-check'>
        <input
          type='checkbox'
          className='form-check-input'
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}
        />
        <label className='form-check-label'>Is Admin</label>
      </div>
      <button type='submit' className='btn btn-primary mt-3'>
        {editingUserId ? 'Update User' : 'Add User'}
      </button>
    </form>
  )
}

export default UserForm
