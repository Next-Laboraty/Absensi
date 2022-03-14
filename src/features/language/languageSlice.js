import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  header: 'Masuk'
}

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    indonesiaLang: (state) => {
      state.header = 'indonesia'
    },
    englishLang: (state) => {
      state.header = 'english'
    }
  },
})

// Action creators are generated for each case reducer function
export const { indonesiaLang, englishLang } = languageSlice.actions

export default languageSlice.reducer