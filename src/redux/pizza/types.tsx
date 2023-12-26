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


export interface PizzaSliceState {
    items: PizzaItem[],
    status: Status;
};
