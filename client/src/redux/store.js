import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./states";
import { userApi } from "./Apis/userApi";
import { setupListeners } from "@reduxjs/toolkit/query";
const store = configureStore({
  reducer: { global: globalReducer, [userApi.reducerPath]: userApi.reducer },
  middleware: (getDefault) => {
    return getDefault().concat(userApi.middleware);
  },
});
setupListeners(store.dispatch);

export default store;
