import { createSlice } from "@reduxjs/toolkit";


const initialState ={ userInfo :  localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null}
const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers : {
    loginAction : (state , action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload))
    },
    logoutAction : (state, action) => {
      state.userInfo = null;
      localStorage.clear();
    },
  }
})

export const {loginAction , logoutAction} = authSlice.actions;
export default authSlice.reducer;