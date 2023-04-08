import React, { memo, useState, useReducer, useContext } from 'react';
import { Col, Row } from 'antd';
import CheckoutForm from './CheckoutForm';
import OrderList from './OrderList';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { ADDRESS_FIELD } from './CheckoutForm';
import axios from '../../services/axios';
import { CHECKOUT } from '../../constants/user';
import { ENV_URL } from '../../constants/index';
import { clearAfterCheckOut } from '../../services/cartService';
import { useDispatch, useSelector } from 'react-redux';
// const style = {
//     background: '#0092ff',
//     padding: '8px 0',
//   };

const paymentData = [{ p_id: 1, name: 'VISA/MASTER Card' }];

export const CHECKOUT_TYPE = {
    PAYMENT: Symbol('payment'),
    ADDRESS: Symbol('address'),
    PROMO: Symbol('promo'),
    CHECKOUT: Symbol('checkout'),
};

export const REQUEST = {
    METHOD: Symbol('payment_method_id'),
    DISTR: Symbol('district'),
    LINE: Symbol('addressLine'),
    PROMO: Symbol('promotionUser_id'),
    PROVINCE: Symbol('province'),
    POSTID: Symbol('postalId'),
};

const initialState = {
    payment_method_id: 1,
    promotionUser_id: -1,
    district: '',
    addressLine: '',
    province: '',
    postalId: '',
};

const checkoutReducer = (state = initialState, action) => {
    const { ADDRESS, PROMO, CHECKOUT, PAYMENT } = CHECKOUT_TYPE;
    const {
        DISTR,
        METHOD,
        POSTID,
        PROMO: PROMO_REQ,
        PROVINCE,
        LINE,
        WARDS,
    } = REQUEST;
    const {
        PROVINCE: PAY_PROVINCE,
        POSTID: PAY_POSTID,
        WARDS: PAY_WARDS,
        LINE: PAY_LINE,
        DISTR: PAY_DISTR,
    } = ADDRESS_FIELD;
    console.log('inside reducer');
    switch (action.type) {
        case 'checkout':
            return { ...state, ...action.payload };
        case PAYMENT: {
            // if(action.payload === undefined) return {...state}
            console.log('my method: ', action.payload);
            return { ...state, [METHOD.description]: action.payload.id };
        }

        case ADDRESS: {
            console.log('call dispatch address...');
            let addressFull = action.payload;
            const {
                district: dis,
                address_line: line,
                province: prov,
                wards: wards,
                postal_id: postId,
            } = action.payload;
            console.log('address full', addressFull);
            return {
                ...state,
                district: dis,
                addressLine: `${line}, ${wards}`,
                province: prov,
                postalId: postId,
            };
        }
        default:
            return state;
    }
};
export const CheckoutContext = React.createContext(null);
const Checkout = () => {
    const [CheckoutReducer, dispatch] = useReducer(
        checkoutReducer,
        initialState,
    );
    const serviceDispatch = useDispatch();
    const navigate = useNavigate();
    const onClickOrder = () => {
        console.log('Order ');
        console.log('Order State: ', CheckoutReducer);
        axios
            .post(`${ENV_URL}${CHECKOUT}`, CheckoutReducer)
            .then((res) => {
                console.log(res.data);
                alert('Thang toán thành công');
                setTimeout(() => {
                    serviceDispatch(clearAfterCheckOut());
                    //   navigate('/profile/')
                    // window.location('/profilpe/');

                    navigate('/profile', {
                        state: {
                            profileId: '3',
                        },
                    });
                }, 2000);
            })
            .catch((e) => {
                console.log(e.message);
            });
    };

    return (
        <CheckoutContext.Provider value={{ CheckoutReducer, dispatch }}>
            <section className="main-section">
                <Row justify="center" gutter={16}>
                    <Col className="gutter-row" span={12}>
                        <CheckoutForm></CheckoutForm>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <OrderList onClickOrder={onClickOrder}></OrderList>
                    </Col>
                </Row>
            </section>
        </CheckoutContext.Provider>
    );
};
export default memo(Checkout);
