import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../store";
// import {Sort} from "./filterSlice";


export type PizzaItem = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
    rating: number;
}

 export enum Status {
    LOADING = 'loading',
    FULFILLED = 'fulfilled',
    REJECTED = 'rejected'

}
export type SearchPizzaParams = {
    order: string;

    sort: {
        sortProperty: string;
        sortDirection: string;
    };
    category: string;
    search: string;
    currentPage: string;
};


interface PizzaSliceState {
    items: PizzaItem[],
    status: Status;
};



export const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING
};
//сокращенная запись обьект со строчками

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
    'pizza/fetchPizzasStatus',
    async (params) => {
    const {
        order,

        category,
        search,
        currentPage
    } = params;

    const response = await  axios.get<PizzaItem[]>(`https://651e831944a3a8aa47687f71.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${params.sort.sortProperty}&order=${order}${search}`);
    return response.data;
});

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

export const PizzaSelector = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;