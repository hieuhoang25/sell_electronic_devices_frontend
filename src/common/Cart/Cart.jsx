import React from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

const Cart = ({ CartItem, addToCart, decreaseQty }) => {
    // Stpe: 7   calucate total of items
    const totalPrice = CartItem.reduce(
        (price, item) => price + item.qty * item.price,
        0,
    );
    let history = useNavigate();

    const onCheckoutHandler = () => {
        history('/checkout');
    };

    // prodcut qty total
    return (
        <>
            <section className="cart-items">
                <div className="container d_flex">
                    {/* if hamro cart ma kunai pani item xaina bhane no diplay */}

                    <div className="cart-details">
                        {CartItem.length === 0 && (
                            <h1 className="no-items product">
                                No Items are add in Cart
                            </h1>
                        )}

                        {/* yasma hami le cart item lai display garaaxa */}
                        {CartItem.map((item) => {
                            const productQty = item.price * item.qty;

                            return (
                                <div
                                    className="cart-list product d_flex"
                                    key={item.id}
                                >
                                    <div className="img">
                                        <img src={item.cover} alt="" />
                                    </div>
                                    <div className="cart-details">
                                        <div className="cart-details-item-title">
                                            <h3 className="cart-details-item-name">
                                                {item.name}
                                            </h3>
                                            <h4 className="cart-details-item-price">
                                                {' '}
                                                ${item.price}.00
                                            </h4>
                                        </div>
                                        <div className="d_flex">
                                            <h4 className="mt-0 ">
                                                Số lượng: {item.qty}
                                            </h4>
                                        </div>

                                        <ul className="cart-product-atrs">
                                            variant-attribute-value
                                            <li>
                                                Màu: <span>Trắng</span>
                                            </li>
                                            <li>
                                                RAM: <span>128GB</span>
                                            </li>
                                        </ul>

                                        <h3 className="cart-details-total">
                                            {/* ${item.price}.00 * {item.qty} */}
                                            <span>${productQty}.00</span>
                                        </h3>
                                    </div>
                                    <div className="cart-items-function">
                                        <div className="removeCart">
                                            <button className="removeCart">
                                                <i className="fa-solid fa-xmark"></i>
                                            </button>
                                        </div>
                                        {/* stpe: 5 
                    product ko qty lai inc ra des garne
                    */}
                                        <div className="cartControl d_flex">
                                            <button
                                                className="incCart"
                                                onClick={() => addToCart(item)}
                                            >
                                                <i className="fa-solid fa-plus"></i>
                                            </button>
                                            <button
                                                className="desCart"
                                                onClick={() =>
                                                    decreaseQty(item)
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
                            <h4>Giảm giá :</h4>
                            <h3>${totalPrice}.00</h3>
                        </div>
                        <div className=" d_flex">
                            <h4>Tổng tiền :</h4>
                            <h3>${totalPrice}.00</h3>
                        </div>
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

export default Cart;
