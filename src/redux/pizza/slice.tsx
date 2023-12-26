import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

import {PizzaItem, PizzaSliceState, SearchPizzaParams, Status} from "./types";
import {fetchPizzas} from "./asyncActions";






export const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING
};
//сокращенная запись обьект со строчками



const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<PizzaItem[]>) {
            state.items = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = Status.LOADING;
            state.items = [];
        });

        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.status = Status.FULFILLED
            state.items = action.payload;
        });

        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.status = Status.REJECTED;
            state.items = [];
        });
    }
});



export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;