import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLogin: false,
    isAutherized: false,
    user: null
};

export const loginConfigSlice = createSlice({
    name: 'loginConfig',
    initialState,
    reducers: {
        setIsLogin: (state, action) => {
            state.isLogin = action.payload;
        },
        setIsAuthorized: (state, action) => {
            state.isAutherized = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

// This will return complete state of this slice.
export const getLoginConfig = (state) => state.loginConfig;

// Action creators are generated for each case reducer function
export const {
    setIsLogin,
    setIsAuthorized,
    setUser
} = loginConfigSlice.actions;

export default loginConfigSlice.reducer;
