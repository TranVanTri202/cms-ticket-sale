import { configureStore } from '@reduxjs/toolkit';
import monthReducer from './monthSlice';

const store = configureStore({
  reducer: {
    month: monthReducer,
    // other reducers if any
  },
});

export default store;
