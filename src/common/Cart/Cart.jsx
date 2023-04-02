import React, { useEffect } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
import {
    addToCart,
    removeFromCart,
    meregeCart,
    clearCart,
    getCartItems,
    getItemsCount,
    getBaseAmount,
    increment,
    decrement,
} from '../../redux/slices/CartSlice';
import {
    removeItemFromCart,
    incrementItemQuantity,
    decrementItemQuantity,
} from '../../services/cartService.js';
import { CURRENCY_SUFFIX } from '../../constants/index';
import { NumericFormat } from 'react-number-format';
import { getImage } from '../../common/img';
export const QTY_MAX = 5;
export const QTY_MIN = 1;

const Cart = () => {
    const dispatch = useDispatch();
    const Cart = useSelector((state) => state.cart);
    const { items, total, baseAmount, totalCount, discount } = Cart;

    const getProductVariantDetail = (cartItem) => {
        const { productVariant } = cartItem;
        return productVariant;
    };
    const getProductName = (cartItem) => {
        const variant = getProductVariantDetail(cartItem);
        return variant.product_name;
    };

    const getColorOfCartItem = (cartItem) => {
        return getProductVariantDetail(cartItem).color_name;
    };

    const getStorageOfCartItem = (cartItem) => {
        return getProductVariantDetail(cartItem).storage_name;
    };

    const getPromotion = (cartItem) => {
        return getProductVariantDetail(cartItem).product_promotion == null
            ? false
            : true;
    };
    const getPromotionValue = (cartItem) => {
        const { product_promotion: promotion } =
            getProductVariantDetail(cartItem);
        const { activate, is_percent, discount_amount } = promotion;
        console.log(promotion);
        return activate
            ? is_percent
                ? `-${discount_amount}%`
                : `${discount_amount}`
            : '';
    };
    const { confirm } = Modal;

    const showPromiseConfirm = (message, id) => {
        confirm({
            title: message,
            icon: <ExclamationCircleFilled />,
            content:
                'When clicked the OK button, this dialog will be closed after 1 second',
            okText: 'Xoá',
            cancelText: 'Đóng',
            async onOk() {
                try {
                    return await new Promise((resolve, reject) => {
                        setTimeout(resolve, 100);
                        //     Math.random() > 0.1 ? resolve : reject,
                        //     1000,
                        // );
                    }).then((data) => {
                        const request = getCartDetailRequest(
                            { cart_id: Cart.id, quantity: 1, id: id },
                            CartRequestTYPE.DELETE,
                        );
                        // request.id = id;
                        console.log('call delete ', request);
                        dispatch(removeItemFromCart(request));
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

    // dispatch(addToCart());
    // dispatch(increment());
    // dispatch(decrement());
    // dispatch(getBaseAmount());
    // const totalPrice = CartItem.reduce(
    //     (price, item) => price + item.qty * item.price,
    //     0,
    // );
    let history = useNavigate();

    const onCheckoutHandler = () => {
        history('/checkout');
    };
    const incrementQty = (item) => {
        let newQty = item.quantity + 1;
        const request = getCartDetailRequest(
            { cart_id: Cart.id, id: item.id, quantity: newQty },
            CartRequestTYPE.UPDATE,
        );

        console.log('increment request:', request);
        dispatch(incrementItemQuantity(request));
    };
    const decrementQty = (item) => {
        let newQty = item.quantity - 1;
        const request = getCartDetailRequest(
            { cart_id: Cart.id, id: item.id, quantity: newQty },
            CartRequestTYPE.DECR,
        );
        console.log('decrement request:', request);
        dispatch(decrementItemQuantity(request));
    };
    useEffect(() => {
        console.log('dispatch change');
    }, [Cart]);

    // prodcut qty total
    return (
        <>
            <section className="cart-items">
                <div className="container d_flex">
                    {/* if hamro cart ma kunai pani item xaina bhane no diplay */}

                    <div className="cart-details">
                        {items.length === 0 && (
                            <h1 className="no-items product">
                                No Items are add in Cart
                            </h1>
                        )}

                        {/* yasma hami le cart item lai display garaaxa */}
                        {items.map((item) => {
                            const productQty = item.price * item.qty;

                            return (
                                <div
                                    className="cart-list product d_flex"
                                    key={item.id}
                                >
                                    <div className="img">
                                        <img
                                            src={getImage(
                                                getProductVariantDetail(item)
                                                    .image,
                                            )}
                                            alt=""
                                        />
                                    </div>
                                    <div className="cart-details">
                                        <div className="cart-details-item-title">
                                            <h3 className="cart-details-item-name">
                                                {getProductName(item)}
                                            </h3>

                                            <h4 className="cart-details-item-price">
                                                {getCurrencyFormatComp(
                                                    getProductVariantDetail(
                                                        item,
                                                    ).price,
                                                )}
                                                {/* <NumericFormat
                                                    value={
                                                        getProductVariantDetail(
                                                            item,
                                                        ).price
                                                    }
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'đ'}
                                                /> */}
                                            </h4>
                                        </div>
                                        <div className="d_flex">
                                            <h4 className="mt-0 ">
                                                Số lượng: {item.quantity}
                                            </h4>
                                        </div>

                                        <ul className="cart-product-atrs">
                                            <li>
                                                Màu:
                                                <span>
                                                    {' ' +
                                                        getColorOfCartItem(
                                                            item,
                                                        )}
                                                </span>
                                            </li>
                                            <li>
                                                RAM:
                                                <span>
                                                    {getStorageOfCartItem(item)}
                                                </span>
                                            </li>
                                            {getPromotion(item) && (
                                                <li>
                                                    Giảm giá:
                                                    <span>
                                                        {getPromotionValue(
                                                            item,
                                                        )}
                                                    </span>
                                                </li>
                                            )}
                                        </ul>

                                        <h3 className="cart-details-total">
                                            {/* ${item.price}.00 * {item.qty} */}
                                            <span
                                                className={`org-price ${
                                                    getPromotion(item)
                                                        ? 'discounted'
                                                        : ''
                                                }`}
                                            >
                                                {getCurrencyFormatComp(
                                                    item.price_detail,
                                                    true,
                                                )}
                                            </span>
                                            {getPromotion(item) && (
                                                <span
                                                    style={{
                                                        display: 'inline-block',
                                                        marginLeft: '1rem',
                                                    }}
                                                >
                                                    {getCurrencyFormatComp(
                                                        item.price_detail -
                                                            item.discount_amount *
                                                                item.quantity,
                                                        true,
                                                    )}
                                                </span>
                                            )}
                                        </h3>
                                    </div>
                                    <div className="cart-items-function">
                                        <div className="removeCart">
                                            <button
                                                className="removeCart"
                                                onClick={() =>
                                                    showPromiseConfirm(
                                                        `Bạn có muốn xoá ${getProductName(
                                                            item,
                                                        )} khỏi giỏ hàng?`,
                                                        item.id,
                                                    )
                                                }
                                            >
                                                <i className="fa-solid fa-xmark"></i>
                                            </button>
                                        </div>
                                        {/* stpe: 5 
                    product ko qty lai inc ra des garne
                    */}
                                        <div className="cartControl d_flex">
                                            <button
                                                disabled={
                                                    item.quantity >= QTY_MAX
                                                }
                                                className="incCart"
                                                onClick={() =>
                                                    incrementQty(item)
                                                }
                                            >
                                                <i className="fa-solid fa-plus"></i>
                                            </button>
                                            <button
                                                disabled={
                                                    item.quantity <= QTY_MIN
                                                }
                                                className="desCart"
                                                onClick={() =>
                                                    decrementQty(item)
                                                }
                                            >
                                                <i className="fa-solid fa-minus"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="cart-item-price"></div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="cart-total fix product">
                        <h2>Thông tin đơn hàng</h2>
                        <div className=" d_flex">
                            <h4>
                                Tổng tiền : {getCurrencyFormatComp(baseAmount)}
                            </h4>
                        </div>
                        <div className=" d_flex">
                            <h4>
                                Giảm giá :{' '}
                                {getCurrencyFormatComp(Cart.discount)}
                            </h4>
                            {/* <h3>${getBaseAmount}.00</h3> */}
                        </div>
                        <h3>
                            <span className="cart-total-title">
                                Thành tiền:
                            </span>
                            {getCurrencyFormatComp(Cart.total)}
                        </h3>
                        <button
                            onClick={onCheckoutHandler}
                            className="btn-primary w-100"
                        >
                            Thanh toán
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export const CartRequestTYPE = {
    UPDATE: Symbol('update'),
    ADD: Symbol('add'),
    DELETE: Symbol('delete'),
    DECR: Symbol('decrement'),
};
export const getCartDetailRequest = (action, CartRequestTYPEz) => {
    const init = {
        cart_id: action.cart_id,
        product_variant_id: action.id,
        quantity: action.quantity,
    };
    const { UPDATE, ADD, DELETE, DECR } = CartRequestTYPE;

    const update = { ...init, id: action.id, quantity: 1 };
    switch (CartRequestTYPEz) {
        case CartRequestTYPE.UPDATE:
            return { ...init, id: action.id };
        case CartRequestTYPE.DELETE:
            return {
                id: action.id,
                cart_id: action.cart_id,
                quantity: action.quantity,
            };
        case CartRequestTYPE.DECR:
            return { ...init, id: action.id };
        default:
            return { ...init };
    }
};

export const getCurrencyFormatComp = (value, haveSuffix = false) => {
    return haveSuffix ? (
        <NumericFormat
            value={value}
            displayType={'text'}
            thousandSeparator={true}
            suffix={' ' + CURRENCY_SUFFIX}
        />
    ) : (
        <NumericFormat
            value={value}
            displayType={'text'}
            thousandSeparator={true}
        />
    );
};
export const formatFixedFloat = (num, toFixed) => {
    return parseFloat(num).toFixed(toFixed);
};
export default Cart;
