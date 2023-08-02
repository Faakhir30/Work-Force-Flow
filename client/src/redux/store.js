import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./states";
const store = configureStore({
  reducer: { global: globalReducer },
});
export default store