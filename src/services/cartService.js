// import { createSlice } from '@reduxjs/toolkit';
import axios from './axios';
import { useDispatch, useSelector } from 'react-redux';
import { CART, CART_ITEM } from '../constants/user';
import {
    addToCart,
    removeFromCart,
    meregeCart,
    clearCart,
    getCartItems,
    getItemsCount,
    getBaseAmount,
    getCart,
    getCartFromSever,
    increment,
    decrement,
} from '../redux/slices/CartSlice';

export const fetchCartFromSever = () => async (dispatch, getState) => {
    try {
        // const cartz = useSelector((state) => state.cart);
        const { isAnonymous } = getState().cart;
        console.log('isAnnon', isAnonymous);
        const promt_path = !isAnonymous ? CART : null;
        if (!isAnonymous) {
            console.log('is not annon');
            await axios
                .get(process.env.REACT_APP_URL + promt_path)
                .then((response_cart) => {
                    console.log(response_cart.data);
                    dispatch(getCartFromSever(response_cart.data));
                })
                .catch((error) => {
                    console.log(error);

                    return;
                });
        } else {
            console.log('get from localstorage');
        }
    } catch (e) {
        console.log(e.message);
    }
};
export const removeItemFromCart =
    (requestItem) => async (dispatch, getState) => {
        const { isAnonymous } = getState().cart;
        if (!isAnonymous) {
            console.log('send remove request...');
            const { id: cart_id } = getState().cart;
            console.log(getState());
            console.log('cartId: ', cart_id);
            await axios
                .delete(
                    `${process.env.REACT_APP_URL}${CART}${cart_id}${CART_ITEM}`,
                    {
                        data: { ...requestItem },
                    },
                )
                .then((res) => {
                    console.log('removed !');
                    //
                    dispatch(fetchCartFromSever());
                })
                .catch((error) => {
                    console.log('erorr: ', error.message);
                    return 0;
                });
        }
    };
