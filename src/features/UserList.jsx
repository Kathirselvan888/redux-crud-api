import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, editUser } from './userSlice'

const UserList = () => {
  const { users } = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const handleEdit = (user) => {
    dispatch(editUser(user))
  }
  const handleDelete = (id) => {
    dispatch(deleteUser(id))
  }
  return (
    <>
      <div className='container'>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              const { name, email, id } = user
              return (
                <tr key={id}>
                  <th scope='row'>{index + 1}</th>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>
                    {' '}
                    <button
                      className='btn btn-success'
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className='btn btn-danger'
                      onClick={() => handleDelete(id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default UserList
