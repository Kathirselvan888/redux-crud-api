import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser } from './usersSlice'
import { Link } from 'react-router-dom'

const UsersList = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.list)

  const handleDelete = (id) => {
    dispatch(deleteUser(id))
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
            <div>
              <Link
                to={`/edit-user/${user.id}`}
                className='btn btn-info btn-sm mr-2'
              >
                Edit
              </Link>
              <button
                className='btn btn-danger btn-sm'
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UsersList
