import { API_BASE_URL, API_UNAUTH_BASE } from './index';
export const BASE_USER = `${API_BASE_URL}user`;
export const ORDER = '/order';
const INFO = '/info';
export const ORDER_TRACKING = '/order-tracking';
export const USER = 'user';
export const WISHLISTS = '/wishlists';
export const USER_WISHLIST = `${USER}${WISHLISTS}/items`;

//  user/cart
export const CART = `${USER}/cart/`;

export const CART_ITEM = `/item`;
export const CHECKOUT = `${USER}/checkout`;
export const NEW_GUEST_CART = `${API_UNAUTH_BASE}/cart`;
export const GUEST_CART_DETAIL = `${API_UNAUTH_BASE}/cart/items`;
export const MERGE_CART = `${CART}add`;
export const RATING = '/rating';
export const IS_RATING = '/is-rating';

export const USER_INFOS = `${USER}/info`;
export const ADDRESS = `/address`;

// api/user/addresss/list
export const USER_ADDRESS_LIST = `${USER}${ADDRESS}/list`;

// api/user/addresss/default
export const USER_ADDRESS_DEFAULT = `${USER}${ADDRESS}/default`;

// api/user/promo/valid
export const PROMO = '/promo';
export const USER_PROMO_LIST = `${USER}${PROMO}/list`;
export const USER_PROMO_VALID = `${USER}${PROMO}/valid`;
export const USER_PROMO_ORDER = `${USER}${PROMO}/order`;
export const USER_PROMO_COUPON = `${USER}${PROMO}/coupon`;
