import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    items: []
};

const cartSlice = createSlice({
    name: ' cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const findItem = state.items.find((object) => object.id === action.payload.id)

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }
            state.totalPrice = state.items.reduce(
                (amount, item) => item.price * item.count + amount, 0);
        },
        minusItem(state, action) {
            const findItem = state.items.find((object) => object.id === action.payload)

            if (findItem) {
                findItem.count--;
            }
            state.totalPrice = state.items.reduce(
                (amount, item) => item.price * item.count + amount, 0);
            },
        removeItem(state, action) {
            // Удаляем элемент из корзины по идентификатору
            state.items = state.items.filter(object => object.id !== action.payload);
            },
        clearItems(state, action) {
            // Очищаем корзину
            state.items = [];
            state.totalPrice = 0;
        }
    },
});

export const CartSelector = state => state.cart;
export const CartItemByIdSelector = (id) => state => state.cart.items.find((object) => object.id === id);

export const {addItem, removeItem, clearItems, minusItem} = cartSlice.actions;

export default cartSlice.reducer;