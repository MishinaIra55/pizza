import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";


export type Sort = {
    name: string,
    sortProperty: SortPropertyEnum;
};

export enum SortPropertyEnum {
    RATING_DESC = 'rating',
    RATING_ASC = '-rating',
    TITLE_DESC = 'title',
    TITLE_ASC = '-title',
    PRICE_DESC = 'price',
    PRICE_ASC = '-price',
}


export interface FilterSliceState {
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
        sortProperty: SortPropertyEnum.PRICE_DESC,
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
            if (Object.keys(action.payload).length) {
                state.currentPage = Number(action.payload.currentPage);
                state.categoryId = Number(action.payload.categoryId);
                state.sort = action.payload.sort;
            } else {
                state.currentPage = 1;
                state.categoryId = 0;
                state.sort = {
                    name: 'популярности',
                    sortProperty: SortPropertyEnum.RATING_DESC,
                };
            }
        },


        }
});

export const FilterSelector = (state: RootState) => state.filter;
export const SortSelector = (state: RootState) => state.filter.sort;

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;