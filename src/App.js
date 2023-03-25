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
import { checkTokenValidity } from './services/config';
import { useDispatch, useSelector } from 'react-redux';
import Protected from './App/Protected';
import axios from './services/axios';
import TokenService from './services/tokenService';
import { INIT } from './redux/actions/AuthAction';
function App() {
    const data = {
        // tài khoản đăng nhập
        userName: 'long',
        password: 'long',
    };
    useEffect(() => {
        checkTokenValidity(data); // call lấy token API của User
    }, []);
    setInterval(() => {
        checkTokenValidity(data);
    }, 3000000); // cứ 50 phút call lấy token 1 lần
    // const datates ={
    //   userName: "long",
    // password: "long"}

    // console.log(datates);
    // checkTokenValidity(datates)

    // console.log(datates);
    // axios({
    //   method:"get",
    //   url:`${BASE}${PRODUCT}${FILTER}`,
    //   data:[{"key":"productName","value":" ","operation":"LIKE"}]
    // }).then((res) => {
    //   console.log(res.data);
    // })
    // .catch((error) => console.log(error));

    /*
  step1 :  const { productItems } = Data 
  lai pass garne using props
  
  Step 2 : item lai cart ma halne using useState
  ==> CartItem lai pass garre using props from  <Cart CartItem={CartItem} /> ani import garrxa in cartItem ma
 
  Step 3 :  chai flashCard ma xa button ma

  Step 4 :  addToCart lai chai pass garne using props in pages and cart components
  */
    //Step 1 :
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
    useEffect(async () => {
        const rs = await axios.post(
            process.env.REACT_APP_URL + 'un/refresh-token',
        );
        const access_token = rs.data.access_token;

        dispatch({
            type: INIT,
            payload: {
                isAuthenticated: true,
                accessToken: access_token,
                role: roleOfUser(access_token),
            },
        });
    }, []);

    return (
        <>
            <Wrapper cartItem={0}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Pages
                                productItems={productItems}
                                addToCart={addToCart}
                                shopItems={productItems}
                            />
                        }
                    ></Route>
                    <Route
                        path="/product/:categoryId"
                        element={<Product />}
                    ></Route>
                    <Route
                        path="/cart"
                        element={
                            <Cart
                                CartItem={CartItem}
                                addToCart={addToCart}
                                decreaseQty={decreaseQty}
                            />
                        }
                    ></Route>
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
                        element={<ProductDetail />}
                    ></Route>
                    <Route
                        path="/checkout"
                        element={<Checkout CartItem={CartItem} />}
                    ></Route>
                </Routes>
            </Wrapper>
        </>
    );
}

export default App;
