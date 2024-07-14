import {createSlice} from '@reduxjs/toolkit'
import {getCookie} from "../../cookie";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: getCookie('access-token') !== null,
  },
  reducers: {
    setAuth(state, action) {
      state.isAuth = action.payload;
    },
  },
})

export const { setAuth } = authSlice.actions
export default authSlice.reducer