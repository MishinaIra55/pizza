import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

export type CartItem = {
    id: string;
    title: string;
    price: number;
    image: string;
    type: string;
    size: number;
    count: number;
};



//interface типизирует только обыект
interface CartSliceState {
    totalPrice: number;
    items:CartItem[];
};


const initialState: CartSliceState = {
    totalPrice: 0,
    items: []
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
            state.totalPrice = state.items.reduce(
                (amount, item) => item.price * item.count + amount, 0);
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

export const CartSelector = (state: RootState) => state.cart;
export const CartItemByIdSelector = (id: string) => (state: RootState) => state.cart.items.find((object) => object.id === id);

export const {addItem, removeItem, clearItems, minusItem} = cartSlice.actions;

export default cartSlice.reducer;