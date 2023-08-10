import { createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";
const initialState = {
  mode: "dark",
  userId: Cookie.get("jwt"),
};
export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setUserId: (state, id) => {
      state.userId = id;
    },
  },
});

export const { setMode, setUserId } = globalSlice.actions;
export default globalSlice.reducer;
