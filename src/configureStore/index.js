import { configureStore } from '@reduxjs/toolkit'
import deskSlice from '../features/desk/deskSlice'
import employeeSlice from '../features/employee/employeeSlice'
import tanggalSlice from '../features/tanggalDate/tanggalSlice'

const store = configureStore({
  reducer: {
    employee: employeeSlice,
    tanggalDate: tanggalSlice,
    DESK_MANAGER: deskSlice
  },
})

export default store