import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  homeProducts: null,
  homeSections: null,
  circleCategories: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setHomeProducts: (state, action) => {
      state.homeProducts = action.payload;
    },
    setHomeSections: (state, action) => {
      state.homeSections = action.payload;
    },
    setCircleCategoriesStore: (state, action) => {
      state.circleCategories = action.payload;
    },
  },
});

// This will return complete state of this slice.
export const getProducts = (state) => state.products;

// Action creators are generated for each case reducer function
export const {
  setCategories,
  setHomeProducts,
  setHomeSections,
  setCircleCategoriesStore
} = productsSlice.actions;

export default productsSlice.reducer;