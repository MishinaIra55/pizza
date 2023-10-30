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
            console.log(action.payload);
            if (findItem) {
                findItem.count ++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
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
        }
    },
});

export const { addItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;