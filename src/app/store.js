import { configureStore } from '@reduxjs/toolkit'
import userRedicer from '../features/userSlice'

const store = configureStore({
  reducer: {
    users: userRedicer,
  },
})

export default store
