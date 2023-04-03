// import { createSlice } from '@reduxjs/toolkit';
import axios from './axios';
import { useDispatch, useSelector } from 'react-redux';
import { CART, CART_ITEM, NEW_GUEST_CART, GUEST_CART_DETAIL } from '../constants/user';
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
    newCart,
    getTotal,
    getDiscountAmount,
} from '../redux/slices/CartSlice';

const ENV_URL = process.env.REACT_APP_URL;
export const fetchCartFromSever = () => async (dispatch, getState) => {
    console.log('fetchCartFromSErver,,,,');
    try {
        // const cartz = useSelector((state) => state.cart);

        const { isAnonymous } = getState().cart;
        console.log('isAnnon', isAnonymous);
        const promt_path = !isAnonymous ? CART : null;
        if (!isAnonymous) {
            console.log('is not annon');
            await axios
                .get(ENV_URL + promt_path)
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
            const { id: cartId } = getState().cart;
            // console.log('cartId: ', cartId);
            if (!cartId) {
                console.log('get fresh guest cart...');
                const cart_new = await getFreshCartForGuest();
                dispatch(newCart(cart_new));
                // alert('stope');
            }
        }
    } catch (e) {
        console.log('error');
        console.log(e.message);
    }
};
// {
//     "cart_id": 0,
//     "product_variant_id": 0,
//     "quantity": 5
//   }
export const removeItemFromCart =
    (requestItem) => async (dispatch, getState) => {
        const { isAnonymous } = getState().cart;
        if (!isAnonymous) {
            console.log('send remove request...');
            const { id: cart_id } = getState().cart;
            console.log(getState());
            console.log('cartId: ', cart_id);
            console.log('requestItem: ', requestItem);
            await axios
                .delete(`${ENV_URL}${CART}${cart_id}${CART_ITEM}`, {
                    data: { ...requestItem },
                })
                .then((res) => {
                    console.log('removed !');
                    //
                    dispatch(fetchCartFromSever());
                })
                .catch((error) => {
                    console.log('erorr: ', error.message);
                    return 0;
                });
        }else {

            console.log('remove item in localstroge...');
            console.log('remove_request: ', requestItem);

            dispatch(removeFromCart(requestItem));
            // dispatch(updateCart());
        }
    };
export const addItemToCart = (request) => async (dispatch, getState) => {
    const { id: cart_id, isAnonymous, items } = getState().cart;
    if (!isAnonymous) {
        await axios
            .post(`${ENV_URL}${CART}${cart_id}${CART_ITEM}`, {
                ...request,
            })
            .then((res) => {
                dispatch(fetchCartFromSever());
            });
        console.log('send add request...');
    } else {
        // dispatch(addToCart());
        console.log('update state in localStorge...');
        
        let requestIndex = checkItemInGuestCart(items,request);
        if(requestIndex >= 0) {
            console.log("variant already in cart: ");
            console.log("Move to increase... ");
            console.log('request: ', request);
            // dispatch(incrementItemQuantity({...request, index:requestIndex}));
            dispatch(guestCarIncrementItemQuantity({...request, index:requestIndex}));
        }else {
            let res = await getGuestRequestCartDetail(request);
            console.log('guest cart detail response: ', res);
            dispatch(addToCart(res))
           

        }
        // dispatch(updateCart());
       

    }
};

export const guestCarIncrementItemQuantity =  (request) => async (dispatch, getState) => {
    const {items} = getState().cart;
    console.log('request: ', request);
    let {quantity: reQty, index} = request;
    // let itemIndex = items.findIndex(i => i.id === id)
    let item = items[index];
    
    console.log('item: ', item);
    let id = item.id;
    let oldQty = item.quantity;
    console.log('reQty: ', reQty);
    let newQty = oldQty + reQty;

    request = {...request, quantity: newQty}
    console.log('increase state in localStorge..');
    console.log('increase: ', request);
    let req = await getGuestRequestCartDetail(request);
    dispatch(increment({...req, index: index, id: id}));
    // dispatch(updateCart());
}

export const incrementItemQuantity =
    (request) => async (dispatch, getState) => {
        const { id: cart_id, isAnonymous } = getState().cart;
        if (!isAnonymous) {
            await axios
                .put(`${ENV_URL}${CART}${cart_id}${CART_ITEM}`, {
                    ...request,
                })
                .then((res) => {
                    dispatch(fetchCartFromSever());
                });
            console.log('send add request...');
        } else {
            const {items} = getState().cart;
       
            let {id} = request;
            console.log('request_increase: ', request);
            let req = await getGuestRequestCartDetail(request);
            
            dispatch(increment({...req, id: id}));
            // dispatch(updateCart());
        }
    };
export const decrementItemQuantity =
    (request) => async (dispatch, getState) => {
        const { id: cart_id, isAnonymous } = getState().cart;
        if (!isAnonymous) {
            await axios
                .put(`${ENV_URL}${CART}${cart_id}${CART_ITEM}`, {
                    ...request,
                })
                .then((res) => {
                    dispatch(fetchCartFromSever());
                });
            console.log('send add request...');
        } else {
            const {items} = getState().cart;
            console.log('decrease state in localStorge..');
            console.log('request: ', request);
            let req = await getGuestRequestCartDetail(request);
            // let index = checkItemInGuestCart(items,request)
            // console.log('index: ',index);
            dispatch(decrement({...req, id: request.id}));
            // updateCart();
        }
    };

const getFreshCartForGuest = async () => {
    try {
        return await (
            await axios.get(`${ENV_URL}${NEW_GUEST_CART}`)
        ).data;
    } catch (e) {
        console.log(e.message);
    }
};


// {
//     "variant_id": 0,
//     "quantity": 5
//   }
const getGuestRequestCartDetail = async (request) => {
    const convertGuestRequest = (req) => {
        return {variant_id: request.product_variant_id, quantity: request.quantity};
    }
    try {
        console.log('reqeustItem for guest: ', request);
        console.log(`${ENV_URL}${GUEST_CART_DETAIL}`);
  
        console.log('request send: ', convertGuestRequest(request));
        return await (await axios.post(`${ENV_URL}${GUEST_CART_DETAIL}`,{...convertGuestRequest()})).data
    } catch (e) {
        console.log(e.message);
    }
};

const checkItemInGuestCart = (items, request) => {
    const {product_variant_id} = request;
    console.log('request pv id: ', product_variant_id);
    return items.findIndex((item) => item.productVariant.id === request.product_variant_id
    );
}

export const updateCart = () => async (dispatch,getState) => {
    dispatch(getItemsCount());
    dispatch(getBaseAmount())
    dispatch(getDiscountAmount());
    dispatch(getTotal());
}
