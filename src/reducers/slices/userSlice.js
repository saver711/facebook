import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
  },
  reducers: {
    userLoginHandler(state, action) {
      state.userData = action.payload
    },
    verify(state, action) {
      state.userData.verified = action.payload
    },
    logout(state) {
      state.userData = null
      Cookies.set("user", null)
    },
    updateStatePicture(state, action) {
      state.userData.picture = action.payload
    },
  },
})

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
