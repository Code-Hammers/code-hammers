import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import profilesReducer from '../features/profiles/profilesSlice';
import userProfileReducer from '../features/userProfile/userProfileSlice';
import alumniReducer from '../features/alumni/alumniSlice';
import applicationReducer from '../features/applications/applicationSlice';
import applicationsReducer from '../features/applications/applicationsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    profiles: profilesReducer,
    userProfile: userProfileReducer,
    alumni: alumniReducer,
    application: applicationReducer,
    applications: applicationsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
