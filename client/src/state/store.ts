import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import productReducer from './requests/productSlice';
import BasketProductReducer from './requests/BasketProductSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        BasketProduct: BasketProductReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;