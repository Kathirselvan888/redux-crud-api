const USER_TOKEN = 'users'
const getUserFromLocalStorage = () => {
  const users = localStorage.getItem(USER_TOKEN)
  return users ? JSON.parse(users) : []
}

const saveUserToLocalStorage = (users) => {
  localStorage.setItem(USER_TOKEN, JSON.stringify(users))
}

export { saveUserToLocalStorage, getUserFromLocalStorage }
