import {createAsyncThunk} from "@reduxjs/toolkit";
import {PizzaItem, SearchPizzaParams} from "./types";
import axios from "axios";


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