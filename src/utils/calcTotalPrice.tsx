import {CartItem} from "../redux/cart/types";


export const calcTotalPrice = (items: CartItem[]) => {
    return items.reduce((amount: number, item: CartItem) => {
        return item.price * item.count + amount;
    }, 0);
};
