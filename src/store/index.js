import { configureStore } from '@reduxjs/toolkit';
import appconfigSlice from '../features/appconfig/appconfigSlice';
import loginconfigSlice from '../features/appconfig/loginconfigSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import searchFilterSlice from '../features/appconfig/searchFilterSlice';
import bookingSlice from '../features/appconfig/bookingSlice';


const reducers = combineReducers({
  appconfig: appconfigSlice,
  loginconfig: loginconfigSlice,
  searchfilters: searchFilterSlice,
  booking: bookingSlice
});

const persistConfig = {
  key: 'gt:rootApp',
  storage: AsyncStorage,
  whitelist: ['loginconfig', 'searchfilters'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export default store;
