import { configureStore } from '@reduxjs/toolkit'
import employeeSlice from '../features/employee/employeeSlice'
import languageSlice from '../features/language/languageSlice'

const store = configureStore({
  reducer: {
    employee: employeeSlice,
    language: languageSlice
  },
})

export default store