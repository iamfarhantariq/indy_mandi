import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loadingScreen: false,
};

export const appConfigSlice = createSlice({
  name: 'appConfig',
  initialState,
  reducers: {
    setActivityIndicator: (state, action) => {
      state.loadingScreen = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setActivityIndicator,
} = appConfigSlice.actions;

export default appConfigSlice.reducer;
