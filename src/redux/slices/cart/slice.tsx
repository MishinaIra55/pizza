import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getCartFromLocalStorage} from "../../../utils/getCartFromLocalStorage";
import {calcTotalPrice} from "../../../utils/calcTotalPrice";

import {CartItem, CartSliceState} from "./types";




const cartData = getCartFromLocalStorage();

const initialState: CartSliceState = {
    totalPrice: cartData.totalPrice,
    items: cartData.items
};

const cartSlice = createSlice({
    name: ' cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find((object) => object.id === action.payload.id)

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }

            state.totalPrice = calcTotalPrice(state.items)
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find((object) => object.id === action.payload)

            if (findItem) {
                findItem.count--;
            }
            state.totalPrice = state.items.reduce(
                (amount, item) => item.price * item.count + amount, 0);
        },
        removeItem(state, action: PayloadAction<string>) {
            // Удаляем элемент из корзины по идентификатору
            state.items = state.items.filter(object => object.id !== action.payload);
        },
        clearItems(state) {
            // Очищаем корзину
            state.items = [];
            state.totalPrice = 0;
        }
    },
});


export const {addItem, removeItem, clearItems, minusItem} = cartSlice.actions;

export default cartSlice.reducer;