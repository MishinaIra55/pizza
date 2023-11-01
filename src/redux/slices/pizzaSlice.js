import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

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

const initialState = {
    items: [],
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
            state.items = [];
        });

        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;

        });

        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.items = [];
        });
    }
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;