import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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
        setSearchValue(state, action) {
            state.searchValue = action.payload;
        },
        setCategoryId(state,action) {
            state.categoryId = action.payload;
        },
        setSort(state,action) {
            state.sort = action.payload;
        },
        setCurrentPage(state,action) {
            state.currentPage = action.payload;
        },
        setFilters(state, action) {
            state.currentPage = Number(action.payload.currentPage);
            state.sort = action.payload.sort;
            state.categoryId = Number(action.payload.categoryId);
        }
    },
});

export const FilterSelector = state => state.filter;
export const SortSelector = state => state.filter.sort;

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;