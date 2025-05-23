import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './slice/weather';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});
