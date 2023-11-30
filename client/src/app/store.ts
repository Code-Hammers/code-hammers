import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import profilesReducer from "../features/profiles/profilesSlice";

export const store = configureStore({
  reducer: { user: userReducer, profiles: profilesReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
