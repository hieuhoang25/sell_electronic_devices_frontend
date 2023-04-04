import { API_BASE_URL, API_UNAUTH_BASE } from './index';
export const BASE_USER = `${API_BASE_URL}/api/user`;
const ORDER = '/order';
const INFO = '/info';
export const ORDER_TRACKING = '/order-tracking';
export const USER = 'user';
export const WISHLISTS = '/wishlists';

//  user/cart
export const CART = `${USER}/cart/`;

export const CART_ITEM = `/item`;
export const CHECKOUT = `${USER}/checkout`;
export const NEW_GUEST_CART = `${API_UNAUTH_BASE}/cart`;
export const GUEST_CART_DETAIL = `${API_UNAUTH_BASE}/cart/items`;
export const MERGE_CART = `${CART}add`

