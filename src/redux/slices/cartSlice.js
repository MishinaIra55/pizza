import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    items: []
};

const cartSlice = createSlice({
    name: ' cart',
    initialState,
    reducers: {
        // addItem(state, action) {
        //     state.items.push(action.payload);
        //     state.totalPrice = state.items.reduce((amount, object) => {
        //         return object.price + amount;
        //     }, 0);
        // },
        addItem(state, action) {
            const findItem = state.items.find((object) => object.id !== action.payload)

            if (findItem) {
                findItem.count ++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }
            state.totalPrice = state.items.reduce((amount, object) => {
                return object.price + amount;
                }, 0);
        },
       removeItem(state, action) {
           state.items = state.items.filter(object => object.id !== action.payload);
        },
        clearItems(state, action) {
            state.items = [];
        }
    },
});

export const { addItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;