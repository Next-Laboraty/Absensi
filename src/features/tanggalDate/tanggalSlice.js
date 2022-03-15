import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  TanggalMenu: 0
}

export const tanggalSlice = createSlice({
  name: 'tanggalDate',
  initialState,
  reducers: {
    tanggalMinusPlus: (state,action) => {
      state.TanggalMenu = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { tanggalMinusPlus } = tanggalSlice.actions

export default tanggalSlice.reducer