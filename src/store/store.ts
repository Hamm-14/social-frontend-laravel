import { configureStore } from "@reduxjs/toolkit";
import { projectApi } from "../apis/query";
import { appSlice } from "./slice/app";

const store = configureStore({
  reducer: { [projectApi.reducerPath]: projectApi.reducer, app: appSlice.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(projectApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
