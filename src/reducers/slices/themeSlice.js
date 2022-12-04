import { createSlice } from "@reduxjs/toolkit"
const initialState = {
  theme: localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light",
    checked: localStorage.getItem("checked") ? localStorage.getItem("checked") : 'auto'
}

const themeSlice = createSlice({
  name: "themeChanger",
  initialState,
  reducers: {
    changeTheme(state, action) {
      state.theme = action.payload.theme
      state.checked = action.payload.checked
    },
  },
})

export const themeActins = themeSlice.actions
export const themeReducer = themeSlice.reducer
