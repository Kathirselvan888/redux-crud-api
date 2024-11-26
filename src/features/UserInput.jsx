import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, updateUser } from './userSlice'

const UserInput = () => {
  const { editingUser } = useSelector((state) => state.users)
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    admin: true,
    id: null,
  })

  const dispatch = useDispatch()

  useEffect(() => {
    if (editingUser) {
      setUserData(editingUser)
    } else {
      setUserData({
        name: '',
        email: '',
        admin: true,
        id: null,
      })
    }
  }, [editingUser])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setUserData({ ...userData, [name]: type === 'checkbox' ? checked : value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingUser) {
      dispatch(updateUser({ id: editingUser.id, updateUser: userData }))
    } else {
      dispatch(addUser({ ...userData, id: Date.now() }))
    }
    setUserData({
      name: '',
      email: '',
      admin: true,
      id: null,
    })
  }
  return (
    <>
      <div className='container'>
        <form className='userform'>
          <label>Name</label>
          <input
            type='text'
            onChange={handleChange}
            value={userData.name}
            name='name'
          />
          <br />
          <label>Email</label>
          <input
            type='text'
            onChange={handleChange}
            value={userData.email}
            name='email'
          />

          <label>Admin</label>
          <input
            type='checkbox'
            onChange={handleChange}
            checked={userData.admin}
            name='admin'
          />
          <button className='btn btn-primary' onClick={handleSubmit}>
            {editingUser?.id ? 'Update' : 'submit'}
          </button>
        </form>
      </div>
    </>
  )
}

export default UserInput
