import React from 'react'
import UsersList from './features/users/UsersList'
import UserForm from './features/users/UserForm'

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>User Management</h1>
      </header>
      <UserForm />
      <UsersList />
    </div>
  )
}

export default App
