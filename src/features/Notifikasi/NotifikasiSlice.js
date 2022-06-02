import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notif: '',

}

export const NotifikasiSlice = createSlice({
  name: 'Notifikasi',
  initialState,
  reducers: {
    setNotif: (state, action) => {
      state.notif = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {setNotif } = NotifikasiSlice.actions

export default NotifikasiSlice.reducer