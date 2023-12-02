import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../store";

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
    const {
        order,
        sortBy,
        category,
        search,
        currentPage
    } = params;

    const response = await  axios.get(`https://651e831944a3a8aa47687f71.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`);
    return response.data;
});

type PizzaItem = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    type: number;
    size: number;
}

interface PizzaSliceState {
    items: PizzaItem[],
    status: 'loading' | 'success' | 'error';
};



const initialState: PizzaSliceState = {
    items: [],
    status: 'loading'
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
        reducers: {
            setItems(state, action) {
                state.items = action.payload;
            }
        },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = 'pending';
                state.items = [];

        });

        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = 'fulfilled'

        });

        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.status = 'rejected';
            state.items = [];
        });
    }
});

export const PizzaSelector = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;