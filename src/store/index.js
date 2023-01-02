import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';
import appConfigSlice from './slices/appConfigSlice';

const reducers = combineReducers({
  appConfig: appConfigSlice,
});

const persistConfig = {
  key: 'im:rootApp',
  storage: AsyncStorage,
  whitelist: ['appConfig'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});

export default store;
