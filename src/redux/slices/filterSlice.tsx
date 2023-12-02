import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";


type Sort = {
    name: string,
    sortProperty: 'rating' | 'title' | 'price' | '-rating' | '-title' | '-price';
};


interface FilterSliceState {
    searchValue: string,
    categoryId: number,
    currentPage: number,
    sort: Sort;
};


const initialState: FilterSliceState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности ',
        sortProperty: 'rating',
    }
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearchValue(state, action: PayloadAction<number>) {
            state.searchValue = action.payload;
        },
        setCategoryId(state,action: PayloadAction<string>) {
            state.categoryId = action.payload;
        },
        setSort(state,action: PayloadAction<Sort>) {
            state.sort = action.payload;
        },
        setCurrentPage(state,action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            state.currentPage = Number(action.payload.currentPage);
            state.sort = action.payload.sort;
            state.categoryId = Number(action.payload.categoryId);
        }
    },
});

export const FilterSelector = (state: RootState) => state.filter;
export const SortSelector = (state: RootState) => state.filter.sort;

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;