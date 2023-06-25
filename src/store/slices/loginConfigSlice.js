import { createSlice } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';

const initialState = {
    isLogin: false,
    isAutherized: false,
    user: null,
    cart: [],
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
            let payload = action.payload;
            delete payload.token;
            state.user = payload;
        },
        setLogout: (state, action) => {
            state.isLogin = false;
            state.isAutherized = false;
            state.user = null;
            state.cart = [];
        },
        setAddToCart: (state, action) => {
            const prevCart = [...state.cart];
            if (!prevCart.find(f => f?.id === action?.payload?.id)) {
                prevCart.push({ ...action?.payload, count: action?.payload?.count || 1 });
                state.cart = prevCart;
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Added'
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Sorry',
                    text2: 'This product already existed in cart.'
                });
            }
        },
        updateCounter: (state, action) => {
            const prevCart = [...state.cart];
            const product = prevCart.find(f => f?.id === action.payload?.id);
            product.count = action.payload?.action === 'increment' ? product.count + 1 : product.count - 1;
            state.cart = prevCart;
        },
        removeFromCart: (state, action) => {
            const prevCart = [...state.cart];
            state.cart = prevCart.filter(f => f?.id !== action.payload);
        }
    },
});

// This will return complete state of this slice.
export const getLoginConfig = (state) => state.loginConfig;

// Action creators are generated for each case reducer function
export const {
    setIsLogin,
    setIsAuthorized,
    setUser,
    setLogout,
    setAddToCart,
    updateCounter,
    removeFromCart
} = loginConfigSlice.actions;

export default loginConfigSlice.reducer;
