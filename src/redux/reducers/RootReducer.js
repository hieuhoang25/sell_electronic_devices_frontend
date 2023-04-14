import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
// import CartReducer from './CartReducer';
import CartReducer from '../slices/CartSlice';
import { ModalReducer } from './ModalReducer';
import { userReducer } from './UserReducer';
const RootReducer = combineReducers({
    auth: AuthReducer,
    cart: CartReducer,
    ModalReducer,
    userReducer
    
});

export default RootReducer;
