import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  dataKehadiran: [],

}

export const kehadiranSlice = createSlice({
  name: 'kehadiran',
  initialState,
  reducers: {
    dataKehadiranEntry: (state, action) => {
      state.dataKehadiran = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { dataKehadiranEntry } = kehadiranSlice.actions

export default kehadiranSlice.reducer