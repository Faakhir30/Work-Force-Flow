import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./states";
import { userApi } from "./Apis/userApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { projectApi } from "./Apis/projectApi";
import { ticketApi } from "./Apis/ticketApi";
const store = configureStore({
  reducer: {
    global: globalReducer,
    [userApi.reducerPath]: userApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [ticketApi.reducerPath]: ticketApi.reducer
  },
  middleware: (getDefault) => {
    return getDefault()
      .concat(userApi.middleware)
      .concat(projectApi.middleware)
      .concat(ticketApi.middleware)
  },
});
setupListeners(store.dispatch);

export default store;
