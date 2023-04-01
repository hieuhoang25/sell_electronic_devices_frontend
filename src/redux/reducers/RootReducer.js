import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
// import CartReducer from './CartReducer';
import CartReducer from '../slices/CartSlice';
const RootReducer = combineReducers({
    auth: AuthReducer,
    cart: CartReducer,
});

export default RootReducer;
