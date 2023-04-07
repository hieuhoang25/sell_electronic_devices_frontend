import React, { memo, useState, useEffect } from 'react';
import Home from '../components/MainPage/Home';
import FlashDeals from '../components/flashDeals/FlashDeals';
import TopCate from '../components/top/TopCate';
import NewArrivals from '../components/newarrivals/NewArrivals';
import Discount from '../components/discount/Discount';
import Annocument from '../components/annocument/Annocument';
import Wrapper from '../components/wrapper/Wrapper';
import ShopHome from '../components/shops/ShopHome';
import TopSales from '../components/topsales/TopSales';
import CategorySlider from '../components/categoryslider/CategorySlider';
import { BASE, PRODUCT, FILTER } from '../constants/index';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from '../services/axios';
import TokenService from '../services/tokenService';
import { useDispatch, useSelector } from 'react-redux';
import { mergeAnnonCart } from '../services/cartService';
import { INIT, LOGIN } from '../redux/actions/AuthAction';
const Pages = ({ productItems, addToCart, CartItem, shopItems, isAuth }) => {
    const size = 10;
    const navigate = useNavigate();
    const [smartphones, setSmartPhones] = useState([]);
    const [laptop, setLaptop] = useState([]);
    //fetch smartPhones
    useEffect(() => {
        axios({
            method: 'post',
            url: `${BASE}${PRODUCT}${FILTER}`,
            data: [
                {
                    key: 'category',
                    value: 1,
                    operation: 'EQUAL',
                },
            ],
            params: { size: size, page: 0 },
        })
            .then((res) => {
                setSmartPhones(() => res.data.data);
                return res.data;
            })
            .catch((error) => error);
    }, []);
    //fetch laptop
    useEffect(() => {
        axios({
            method: 'post',
            url: `${BASE}${PRODUCT}${FILTER}`,
            data: [
                {
                    key: 'category',
                    value: 2,
                    operation: 'EQUAL',
                },
            ],
            params: { size: size, page: 0 },
        })
            .then((res) => {
                setLaptop(() => res.data.data);
                return res.data;
            })
            .catch((error) => error);
    }, []);
    //handle login google success
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const access_token = searchParams.get('access_token');
    const refresh_token = searchParams.get('refresh_token');
    useEffect(() => {
        if (access_token && refresh_token) {
            axios
                .get(process.env.REACT_APP_URL + 'un/token-login-google', {
                    params: {
                        accessToken: access_token,
                        refreshToken: refresh_token,
                    },
                })
                .then((res) => {
                    dispatch({
                        type: LOGIN,
                        payload: {
                            isAuthenticated: true,
                            fullName: null,
                            role: res.data.roles[0].authority,
                            accessToken: res.data.access_token,
                        },
                    });
                    dispatch(mergeAnnonCart());
                });
            TokenService.setCookieAccessToken(access_token);
            navigate('/');
        }
    });
    return (
        <>
            <Home CartItem={CartItem} />
            <FlashDeals productItems={productItems} addToCart={addToCart} />
            <TopCate />
            <NewArrivals />
            <Discount />
            <TopSales isAuth={isAuth} />
            <CategorySlider />
            {smartphones && smartphones.length != 0 && (
                <ShopHome
                    isAuth={isAuth}
                    shopItems={smartphones}
                    title={'Điện thoại'}
                />
            )}
            {laptop && laptop.length != 0 && (
                <ShopHome isAuth={isAuth} shopItems={laptop} title={'Laptop'} />
            )}

            <Annocument />
            <Wrapper />
        </>
    );
};

export default memo(Pages);
