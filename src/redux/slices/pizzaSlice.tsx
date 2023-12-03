import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../store";


type PizzaItem = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    type: number;
    size: number;
}

//сокращенная запись обьект со строчками

export const fetchPizzas = createAsyncThunk<PizzaItem[], Record<string, string>>(
    'pizza/fetchPizzasStatus',
    async (params) => {
    const {
        order,
        sortBy,
        category,
        search,
        currentPage
    } = params;

    const response = await  axios.get<PizzaItem[]>(`https://651e831944a3a8aa47687f71.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`);
    return response.data;
});



interface PizzaSliceState {
    items: PizzaItem[],
    status: 'loading' | 'fulfilled' | 'rejected';
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
            state.status = 'fulfilled'
            state.items = action.payload;
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