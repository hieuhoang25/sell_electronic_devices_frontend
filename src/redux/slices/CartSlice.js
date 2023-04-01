import { createSlice } from '@reduxjs/toolkit';
import axios from '../../services/axios';
import { fetchCartFromSever } from '../../services/cartService';

// export const fetchCartFromSever = (cart) => async (dispatch) => {
//     try {
//         const { isAnonymous } = cart;
//         console.log('isAnnon', dispatch(getCart()));
//         const promt_path = !isAnonymous ? 'user/cart' : null;
//         if (!isAnonymous) {
//             console.log('is not annon');
//             // await axios
//             //     .get(process.env.REACT_APP_URL + promt_path)
//             //     .then((response_cart) => {
//             //         console.log(response_cart.data);
//             //         dispatch(getCartFromSever(response_cart.data));
//             //     })
//             //     .catch((error) => {
//             //         console.log(error);
//             //         alert('llo');
//             //         return;
//             //     });
//         } else {
//             console.log('get from localstorage');
//         }
//     } catch (e) {
//         console.log(e.message);
//     }
// };
const initialState = {
    isAnonymous: true,
    id: null,
    items: [],
    total: 0.0,
    baseAmount: 0.0,
    totalCount: 0,
    discount: 0.0,
};

export const CartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        reset: () => {
            console.log('reset');
            return { ...initialState };
        },
        addToCart: {
            reducer: (state, action) => {
                console.log('state.items', state.items);
                if (state.items.length == 0) return;
                let cartIndex = state.items.findIndex(
                    (item) => item.id === action.payload.id,
                );
                if (cartIndex >= 0) {
                    state.items[cartIndex].quantity += 1;
                } else {
                    let tempProduct = { ...action.payload, quantity: 1 };
                    state.items.push(tempProduct);
                }
            },
        },
        increment: (state, action) => {
            if (state.items.length == 0) return;
            let index = state.items.find((item) => item.id === action.payload);
            state.items[index].qty += 1;
        },
        decrement: (state, action) => {
            if (state.items.length == 0) return;
            let index = state.items.find((item) => item.id === action.payload);
            if (state.cartItems[index].quantity <= 0) {
                state.cartItems[index].quantity = 0;
            } else {
                state.cartItems[index].quantity -= 1;
            }
        },
        removeFromCart: (state, action) => {
            if (state.items.length == 0) return;
            let index = state.items.findIndex(
                (item) => item.id === action.payload,
            );
            if (index !== -1) {
                state.items.splice(index, 1);
            }
        },
        meregeCart: (state) => {},
        clearCart: (state) => {},
        getCartItems: (state, action) => {
            return state.items;
        },
        getCart: (state) => {
            return { ...state };
        },
        getItemsCount: (state, action) => {
            console.log('getItemsCount');
            if (state.items.length == 0) return;
            let cartCount = state.items.reduce((item, total) => {
                return item.quantity + total;
            }, 0);
            console.log('cartCount', cartCount);
            state.totalCount = cartCount;
        },
        getBaseAmount: (state, action) => {
            if (state.items.length == 0.0) return;
            state.baseAmount = state.items.reduce((sub, item) => {
                return sub + item.price * item.qty;
            }, 0);
        },
        getCartFromSever: (state, action) => {
            console.log('action', action);
            state.id = action.payload.id;
            state.items = action.payload.cartDetails;
            state.baseAmount = action.payload.price_sum;
            let cartCount = state.items.reduce((total, item) => {
                console.log(item);
                return item.quantity + total;
            }, 0);
            state.totalCount = cartCount;
            // state.totalCount =
            // state.items.length == null ? 0 : state.items.length;

            // console.log('cartDta: ', state.items);
            const discountAmount = state.items.reduce((d, i) => {
                return i.discount_amount * i.quantity + d;
            }, 0);
            console.log('discountAmount: ', discountAmount);
            state.discount = discountAmount;
            state.total = state.baseAmount - state.discount;
        },
        authenticateCart: (state, action) => {
            state.isAnonymous = action.payload;
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    meregeCart,
    clearCart,
    getCartItems,
    getItemsCount,
    getBaseAmount,
    increment,
    decrement,
    getCart,
    getCartFromSever,
    authenticateCart,
    reset,
} = CartSlice.actions;

export default CartSlice.reducer;
