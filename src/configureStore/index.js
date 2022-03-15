import { configureStore } from '@reduxjs/toolkit'
import employeeSlice from '../features/employee/employeeSlice'
import tanggalSlice from '../features/tanggalDate/tanggalSlice'

const store = configureStore({
  reducer: {
    employee: employeeSlice,
    tanggalDate: tanggalSlice
  },
})

export default store