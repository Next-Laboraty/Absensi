import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  employee: [],
  email: '',
  server:'',
  token:'',

}

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    employee_name: (state, action) => {
      state.user = action.payload
    },
    employee_data: (state, action) => {
      state.employee = action.payload
    },
    employee_mail: (state, action) => {
      state.email = action.payload
    },
    employee_server: (state, action) => {
      state.server = action.payload
    },
    employee_token: (state, action) => {
      state.token = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { employee_data, employee_name, employee_mail,employee_server,employee_token } = employeeSlice.actions

export default employeeSlice.reducer