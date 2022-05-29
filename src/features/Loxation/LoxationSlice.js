import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  longitude: null,
  latitude: null

}

export const LoxationSlice = createSlice({
  name: 'Loxation',
  initialState,
  reducers: {
    setLatitude: (state, action) => {
      state.latitude = action.payload
    },
    setLongitude : (state, action) => {
        state.longitude = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {setLatitude, setLongitude } = LoxationSlice.actions

export default LoxationSlice.reducer