import React, { useEffect, useState } from 'react';
import './App.css';
import jwtDecode from 'jwt-decode';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pages from './pages/Pages';
import Data from './components/Data';
import Cart from './common/Cart/Cart';
import Sdata from './components/shops/Sdata';
import ProductDetail from './components/productDetail/ProductDetail';
import Profile from './components/userProfile/Profile';
import Wrapper from './Wrapper';
import LoginPage from './components/LoginPage/LoginPage';
import SignUp from './components/SignUpPage/SignUp';
import Checkout from './components/checkout/Checkout';
import Product from './components/product/Product';
import { useDispatch, useSelector } from 'react-redux';
import Protected from './App/Protected';
import axios from './services/axios';
import TokenService from './services/tokenService';
import { INIT } from './redux/actions/AuthAction';
import { INIT_CART } from './redux/actions/CartAction';
import { authenticateCart } from './redux/slices/CartSlice';
import { fetchCartFromSever,resetToGuestCart } from './services/cartService';
function App() {
    const { productItems } = Data;
    const { shopItems } = Sdata;

    //Step 2 :
    const [CartItem, setCartItem] = useState([]);

    //Step 4 :
    const addToCart = (product) => {
        // if hamro product alredy cart xa bhane  find garna help garxa
        const productExit = CartItem.find((item) => item.id === product.id);
        // if productExit chai alredy exit in cart then will run fun() => setCartItem
        // ani inside => setCartItem will run => map() ani yo map() chai each cart ma
        // gayara check garxa if item.id ra product.id chai match bhayo bhane
        // productExit product chai display garxa
        // ani increase  exits product QTY by 1
        // if item and product doesnt match then will add new items
        if (productExit) {
            setCartItem(
                CartItem.map((item) =>
                    item.id === product.id
                        ? { ...productExit, qty: productExit.qty + 1 }
                        : item,
                ),
            );
        } else {
            // but if the product doesnt exit in the cart that mean if card is empty
            // then new product is added in cart  and its qty is initalize to 1
            setCartItem([...CartItem, { ...product, qty: 1 }]);
        }
    };

    // Stpe: 6
    const decreaseQty = (product) => {
        // if hamro product alredy cart xa bhane  find garna help garxa
        const productExit = CartItem.find((item) => item.id === product.id);

        // if product is exit and its qty is 1 then we will run a fun  setCartItem
        // inside  setCartItem we will run filter to check if item.id is match to product.id
        // if the item.id is doesnt match to product.id then that items are display in cart
        // else
        if (productExit.qty === 1) {
            setCartItem(CartItem.filter((item) => item.id !== product.id));
        } else {
            // if product is exit and qty  of that produt is not equal to 1
            // then will run function call setCartItem
            // inside setCartItem we will run map method
            // this map() will check if item.id match to produt.id  then we have to desc the qty of product by 1
            setCartItem(
                CartItem.map((item) =>
                    item.id === product.id
                        ? { ...productExit, qty: productExit.qty - 1 }
                        : item,
                ),
            );
        }
    };
    const roleOfUser = (accessToken) => {
        if (!accessToken) {
            return false;
        }
        const decodedToken = jwtDecode(accessToken);
        return decodedToken.roles[0];
    };
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const cart = useSelector((state) => state.cart);

    useEffect(async () => {
        console.log('App useEffect loading..');
        
        // try {
        await axios
            .get(process.env.REACT_APP_URL + 'un/refresh-token')
            .then((rs) => {
                console.log('get accesstoken...');
                const access_token = rs.data.access_token;
                dispatch({
                    type: INIT,
                    payload: {
                        isAuthenticated: true,
                        accessToken: access_token,
                        role: roleOfUser(access_token),
                    },
                });
                console.log('auth; ', auth);
                if(!auth.isAuthenticated) {
                    console.log('load cart from server');
                    dispatch(authenticateCart(true))
                    console.log('cart state in App.js', cart);
                    dispatch(fetchCartFromSever());
                }
                
            })
            .catch((e) => {
                console.log('auth: ', auth);
                if(!auth.isAuthenticated) {
                    console.log('set to false,reset');
                    // dispatch(resetToGuestCart());
                    dispatch(authenticateCart(true))

                    // dispatch(res)
                }
                console.log('cart before fecthc error: ',cart);
                console.log('fetch cart with error');
                dispatch(fetchCartFromSever());
                return;
            });
            console.log('ending...effect');
    }, []);

    return (
        <>
            <Wrapper >
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Pages
                                productItems={productItems}
                                addToCart={addToCart}
                                shopItems={productItems}
                                isAuth={auth.isAuthenticated}
                            />
                        }
                    ></Route>
                    <Route
                        path="/product/:categoryId"
                        element={<Product isAuth={auth.isAuthenticated} />}
                    ></Route>
                    <Route path="/cart" element={<Cart />}></Route>
                    <Route path="/login" element={<LoginPage />}></Route>
                    <Route
                        path="/profile"
                        element={
                            <Protected isSignedIn={auth.isAuthenticated}>
                                <Profile />
                            </Protected>
                        }
                    ></Route>
                    <Route
                        path="/product-detail/:productId"
                        element={
                            <ProductDetail isAuth={auth.isAuthenticated} />
                        }
                    ></Route>
                    <Route
                        path="/checkout"
                        element={
                            <Protected isSignedIn={auth.isAuthenticated}>
                                <Checkout CartItem={CartItem} />
                            </Protected>
                        }
                    ></Route>
                </Routes>
            </Wrapper>
        </>
    );
}

export default App;
