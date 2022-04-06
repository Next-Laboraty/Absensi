import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  GET_TASK: [],
  GET_TODO: [],
  GET_BULETIN:[],
}

export const deskSlice = createSlice({
  name: 'DESK_MANAGER',
  initialState,
  reducers: {
    MASUKAN_TASK: (state, action) => {
      state.GET_TASK = action.payload
    },
    MASUKAN_TODO: (state, action) => {
      state.GET_TODO = action.payload
    },
    MASUKAN_CATATAN: (state, action) => {
      state.GET_BULETIN = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { MASUKAN_TASK,MASUKAN_TODO,MASUKAN_CATATAN } = deskSlice.actions

export default deskSlice.reducer