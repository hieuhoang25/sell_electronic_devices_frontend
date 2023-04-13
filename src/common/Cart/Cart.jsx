import React, { useEffect } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
import {Button as MUIButton}  from '@mui/material';
import { Link } from 'react-router-dom';
import { HeartOutlined, HeartFilled, FrownOutlined } from '@ant-design/icons';
import LoginPromptNotification from '../../common/notification/LoginPromptNotification';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';

import {
    removeItemFromCart,
    incrementItemQuantity,
    decrementItemQuantity,
    updateCart,
    mergeAnnonCart,
    updateGuestCartState
} from '../../services/cartService.js';
import { getImage } from '../../common/img';
import {
    getVariantDetail,
    getColorOfCartItem,
    getProductName,
    getPromotion,
    getPromotionValue,
    getStorageOfCartItem,
    CartRequestTYPE,
    getCartDetailRequest,
    getCurrencyFormatComp,
    getDiscountAmountOfItem,
} from './CartUtil';
export const QTY_MAX = 5;
export const QTY_MIN = 1;

const Cart = () => {
    const dispatch = useDispatch();
    const Cart = useSelector((state) => state.cart);
    const { items, total, baseAmount, totalCount, discount } = Cart;

    const { confirm } = Modal;

    const showPromiseConfirm = (message, id) => {
        confirm({
            title: message,
            icon: <ExclamationCircleFilled />,
            content: '',
            okText: 'Xoá',
            cancelText: 'Đóng',
            async onOk() {
                try {
                    return await new Promise((resolve, reject) => {
                        setTimeout(resolve, 100);
                    }).then((data) => {
                        const request = getCartDetailRequest(
                            { cart_id: Cart.id, quantity: 1, id: id },
                            CartRequestTYPE.DELETE,
                        );
                        // request.id = id;
                        console.log('call delete ', request);
                        dispatch(removeItemFromCart(request));
                        dispatch(updateCart());
                    });
                } catch {
                    return console.log('Oops errors!');
                }
            },
            onCancel() {},
        });
    };
    // showPromiseConfirm('Sản phẩm sẽ bị xoá khỏi giỏ');
    const removeItemHandler = (id) => {};

    let history = useNavigate();

    function onCheckoutHandler() {
        if (Cart.isAnonymous) {
        } else {
            history('/checkout');
        }
    }
    function onUpdateGuestHandler() {
        alert("update");
        dispatch(updateGuestCartState());
         
    }
    const incrementQty = (item) => {
        let newQty = item.quantity + 1;
        console.log('item s id: ', item.id);
        const request = getCartDetailRequest(
            {
                cart_id: Cart.id,
                id: item.id,
                quantity: newQty,
                product_variant_id: item.productVariant.id,
            },
            CartRequestTYPE.UPDATE,
        );

        console.log('increment request:', request);
        dispatch(incrementItemQuantity(request));
    };
    const decrementQty = (item) => {
        let newQty = item.quantity - 1;
        const request = getCartDetailRequest(
            {
                cart_id: Cart.id,
                id: item.id,
                quantity: newQty,
                product_variant_id: item.productVariant.id,
            },
            CartRequestTYPE.DECR,
        );
        console.log('decrement request:', request);
        dispatch(decrementItemQuantity(request));
    };
    useEffect(() => {
        console.log('dispatch change');
        if (Cart.isAnonymous) {
            console.log('updateCart()');
            dispatch(updateCart(Cart));
        }
    }, [Cart]);

    const cartAfterLoginHandler = () => {
        dispatch(mergeAnnonCart());
    };
    // prodcut qty total
    return (
        <>
            <section className="cart-items">
                <div className="container d_flex">
                    {/* if hamro cart ma kunai pani item xaina bhane no diplay */}

                    <div className={`cart-details ${items.length===0? 'w-100-im':'' } `}>
                        {items.length === 0 && (
                            <div className="no-items product d_flex_jus_center">
                                <div>
                                    Giỏ hàng trống   
                                   {`   `} <FrownOutlined />
                                </div>

                                <Link to={'/product/1'} className="shop-btn">
                                <i class="fa-solid fa-cart-shopping"></i>
                                {`   `}   Tiếp tục mua sắm
                                </Link>
                            </div>
                        )}

                        {/* yasma hami le cart item lai display garaaxa */}
                        {items.map((item) => {
                            const productQty = item.price * item.qty;

                            return (
                                <div className="cart-list product d_flex" key={item.id}>
                                    <div className="img">
                                        <img src={getImage(getVariantDetail(item).image)} alt="" />
                                    </div>
                                    <div className="card-cart-details">
                                        <div className="cart-details-item-title">
                                            <h3 className="cart-details-item-name">
                                                <Link
                                                    to={`/product-detail/${
                                                        getVariantDetail(item).id
                                                    }`}>
                                                    {getProductName(item)}
                                                </Link>
                                            </h3>

                                            {/* <h4 className="cart-details-item-price">
                                                {getCurrencyFormatComp(
                                                    getVariantDetail(item).price,
                                                )}
                                            </h4> */}
                                        </div>
                                        <ul className="cart-product-atrs">
                                            <li>
                                                Màu:
                                                <span>{' ' + getColorOfCartItem(item)}</span>
                                            </li>
                                            <li>
                                                RAM:
                                                <span>{getStorageOfCartItem(item)}</span>
                                            </li>
                                            <li className='single-price'>
                                            Đơn giá:{' '}
                                                {getCurrencyFormatComp(
                                                    getVariantDetail(item).price, false,'atr-price'
                                                )}

                                            </li>
                                            {getPromotion(item) && (
                                                <li>
                                                    Giảm giá:
                                                    {getCurrencyFormatComp(
                                                         getPromotionValue(item))
                                                   } 
                                                   {` x `} { item.quantity}
                                                </li>

                                            )}
                                        </ul>
                                        <div className="cart-detail-action-cotainer">
                                            <Stack
                                                className="action-buttons"
                                                direction="row"
                                                spacing={2}>
                                                <MUIButton startIcon={<FavoriteIcon />}>
                                                    Yêu thích
                                                </MUIButton>
                                                <MUIButton
                                                    className="remove-cart-btn"
                                                    startIcon= {<DeleteIcon />}
                                                    onClick={() =>
                                                        showPromiseConfirm(
                                                            `Bạn có muốn xoá ${getProductName(
                                                                item,
                                                            )} khỏi giỏ hàng?`,
                                                            item.id,
                                                        )
                                                    }>
                                                    Xoá
                                                    
                                                  
                                                </MUIButton>
                                            </Stack>
                                        </div>
                                       
                                    </div>
                                    <div className="cart-list-right d_flex_col">
                                        <div className="cart-item-price">
                                            <h3 className="cart-details-total">
                                                {/* ${item.price}.00 * {item.qty} */}
                                                <span
                                                    className={`org-price ${
                                                        getPromotion(item) ? 'discounted' : ''
                                                    }`}>
                                                    {getCurrencyFormatComp(item.price_detail, true)}
                                                </span>
                                                {getPromotion(item) && (
                                                    <span
                                                        style={{
                                                            display: 'inline-block',
                                                            marginLeft: '1rem',
                                                        }}>
                                                        {getCurrencyFormatComp(
                                                            getDiscountAmountOfItem(item),

                                                            true,
                                                        )}
                                                    </span>
                                                )}
                                            </h3>
                                        </div>
                                        <div className="cart-items-function">
                                           {/* ! old remove button   */}
                                            {/* <div className="removeCart">
                                                <button
                                                    className="removeCart"
                                                    onClick={() =>
                                                        showPromiseConfirm(
                                                            `Bạn có muốn xoá ${getProductName(
                                                                item,
                                                            )} khỏi giỏ hàng?`,
                                                            item.id,
                                                        )
                                                    }>
                                                    <i className="fa-solid fa-xmark"></i>
                                                </button>
                                            </div> */}
                                            {/* stpe: 5 
                        product ko qty lai inc ra des garne
                        */}
                                            <div className="cartControl d_flex">
                                                <button
                                                    disabled={item.quantity >= QTY_MAX}
                                                    className="incCart"
                                                    onClick={() => incrementQty(item)}>
                                                    <i className="fa-solid fa-plus"></i>
                                                </button>

                                                <div className="quantity">{item.quantity}</div>

                                                <button
                                                    disabled={item.quantity <= QTY_MIN}
                                                    className="desCart"
                                                    onClick={() => decrementQty(item)}>
                                                    <i className="fa-solid fa-minus"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
{items.length !== 0 && ( <div className="cart-total fix product">
                        <h2>Thông tin đơn hàng</h2>
                        <div className=" d_flex">
                            <h4>Tạm tính :</h4>
                            {getCurrencyFormatComp(baseAmount)}
                        </div>
                        <div className=" d_flex">
                            <h4>Giảm giá : </h4>
                            {getCurrencyFormatComp(Cart.discount)}
                            {/* <h3>${getBaseAmount}.00</h3> */}
                        </div>
                        <h3 className='d_flex cart-total-last'>
                            <span className="cart-total-title">Tổng tiền:</span>
                            {getCurrencyFormatComp(Cart.total)}
                        </h3>
                        {Cart.isAnonymous ? (
                            <>
                            <LoginPromptNotification> </LoginPromptNotification>
                            {/* <button onClick={onUpdateGuestHandler} className="btn-primary w-100">
                               Update Guest Cart
                            </button> */}
                            </>
                        ) : (
                            <button onClick={onCheckoutHandler} className="btn-primary w-100">
                                Thanh toán
                            </button>
                        )}
                    </div>) }
                   
                </div>
            </section>
        </>
    );
};
export const formatFixedFloat = (num, toFixed) => {
    return parseFloat(num).toFixed(toFixed);
};
export default Cart;
