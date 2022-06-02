import { configureStore } from '@reduxjs/toolkit'
import deskSlice from '../features/desk/deskSlice'
import employeeSlice from '../features/employee/employeeSlice'
import NotifikasiSlice from '../features/Notifikasi/NotifikasiSlice'
import tanggalSlice from '../features/tanggalDate/tanggalSlice'
import kehadiranSlice from '../features/attendance/kehadiranSlice'
import LoxationSlice from '../features/Loxation/LoxationSlice'

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  }),
  reducer: {
    employee: employeeSlice,
    tanggalDate: tanggalSlice,
    DESK_MANAGER: deskSlice,
    Notifikasi: NotifikasiSlice,
    kehadiran: kehadiranSlice,
    Loxation : LoxationSlice
  },
})

export default store