import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./states";
import { userApi } from "./Apis/userApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { projectApi } from "./Apis/projectApi";
const store = configureStore({
  reducer: {
    global: globalReducer,
    [userApi.reducerPath]: userApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
  },
  middleware: (getDefault) => {
    return getDefault()
      .concat(userApi.middleware)
      .concat(projectApi.middleware);
  },
});
setupListeners(store.dispatch);

export default store;
