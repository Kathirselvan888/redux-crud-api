// UsersList.js
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, deleteUser, setEditingUserId } from './usersSlice'

const UsersList = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.list)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const handleDelete = (id) => {
    dispatch(deleteUser(id))
  }

  const handleEdit = (id) => {
    dispatch(setEditingUserId(id)) // Set the user ID for editing in Redux
  }

  return (
    <div className='container'>
      <h2>User List</h2>
      <ul className='list-group'>
        {users.map((user) => (
          <li
            className='list-group-item d-flex justify-content-between align-items-center'
            key={user.id}
          >
            {user.name} ({user.email}) {user.isAdmin ? '(Admin)' : ''}
            <button
              className='btn btn-info btn-sm'
              onClick={() => handleEdit(user.id)}
            >
              Edit
            </button>
            <button
              className='btn btn-danger btn-sm'
              onClick={() => handleDelete(user.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UsersList
