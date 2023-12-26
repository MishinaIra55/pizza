export type CartItem = {
    id: string;
    title: string;
    price: number;
    image: string;
    type: string;
    size: number;
    count: number;
};



//interface типизирует только обыект
export interface CartSliceState {
    totalPrice: number;
    items:CartItem[];
};