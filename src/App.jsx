import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import UsersList from './features/users/UsersList'
import UserForm from './features/users/UserForm'

function App() {
  return (
    <Router>
      <div className='App'>
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <Link to='/' className='navbar-brand'>
            User Management
          </Link>
          <Link to='/add-user' className='btn btn-primary ml-auto'>
            Add User
          </Link>
        </nav>
        <Routes>
          <Route path='/' element={<UsersList />} />
          <Route path='/add-user' element={<UserForm />} />
          <Route path='/edit-user/:userId' element={<UserForm />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
