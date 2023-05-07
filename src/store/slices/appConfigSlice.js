import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loadingScreen: false,
  countryStates: [],
  conversationsData: null
};

export const appConfigSlice = createSlice({
  name: 'appConfig',
  initialState,
  reducers: {
    setActivityIndicator: (state, action) => {
      state.loadingScreen = action.payload;
    },
    setCountryStates: (state, action) => {
      state.countryStates = action.payload;
    },
    setConversationsData: (state, action) => {
      state.conversationsData = action.payload;
    },
  },
});

// This will return complete state of this slice.
export const getAppConfig = (state) => state.appConfig;

// Action creators are generated for each case reducer function
export const {
  setActivityIndicator,
  setCountryStates,
  setConversationsData
} = appConfigSlice.actions;

export default appConfigSlice.reducer;
