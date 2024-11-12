import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, updateUser } from './usersSlice'
import { useNavigate, useParams } from 'react-router-dom'

const UserForm = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.list)
  const userToEdit = users.find((user) => user.id === parseInt(userId))

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (userToEdit) {
      setName(userToEdit.name)
      setEmail(userToEdit.email)
      setIsAdmin(userToEdit.isAdmin)
    }
  }, [userToEdit])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newUser = {
      id: userToEdit ? userToEdit.id : Date.now(),
      name,
      email,
      isAdmin,
    }
    if (userToEdit) {
      dispatch(updateUser(newUser))
    } else {
      dispatch(addUser(newUser))
    }

    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit} className='container mt-3'>
      <h2>{userToEdit ? 'Edit User' : 'Add User'}</h2>
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
        {userToEdit ? 'Update User' : 'Add User'}
      </button>
    </form>
  )
}

export default UserForm
