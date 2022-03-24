import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notif: [],

}

export const NotifikasiSlice = createSlice({
  name: 'Notifikasi',
  initialState,
  reducers: {
    tambahNotifikasi: (state, action) => {
      state.notif.push(...state.notif,action.payload )
    },
  },
})

// Action creators are generated for each case reducer function
export const {tambahNotifikasi } = NotifikasiSlice.actions

export default NotifikasiSlice.reducer