import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice.tsx';
import cart from './slices/cartSlice.tsx';
import pizza from './slices/pizzaSlice.tsx';
import {useDispatch} from "react-redux";


export const store = configureStore({
    reducer: {
        filter,
        cart,
        pizza
    },
})



export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();