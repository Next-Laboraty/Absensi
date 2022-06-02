import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  dataKehadiran: [],
  dataIstirahat:[]

}

export const kehadiranSlice = createSlice({
  name: 'kehadiran',
  initialState,
  reducers: {
    dataKehadiranEntry: (state, action) => {
      state.dataKehadiran = action.payload
    },
    dataIstirahatEntry: (state, action) => {
      state.dataIstirahat = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { dataKehadiranEntry, dataIstirahatEntry } = kehadiranSlice.actions

export default kehadiranSlice.reducer