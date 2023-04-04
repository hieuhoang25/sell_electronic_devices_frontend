import React from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CURRENCY_SUFFIX } from '../../constants/index';
import { NumericFormat } from 'react-number-format';
import { getCurrencyFormatComp } from '../../common/Cart/Cart';
import { getImage } from '../../common/img';
const OrderList = () => {
    // console.log(CartItem);

    const Cart = useSelector((state) => {
        return state.cart;
    });
    const { items } = Cart;
    const list = items.map((item) => {
        return <OrderListItem product={item}></OrderListItem>;
    });
    const onOrderHandler = () => {};
    return (
        <section className="order-list">
            <h4>Đơn hàng</h4>
            <ul>{list}</ul>
            <div className="order-total">
                <div className="box">
                    <h3>Số lượng</h3>
                    <div className="total">{Cart.totalCount}</div>
                </div>
                <div className="box">
                    <h3>Tổng tiền</h3>
                    <div className="total">
                        {getCurrencyFormatComp(Cart.total, true)}
                    </div>
                </div>
            </div>
            <div className="order-btn">
                <Button onClick={onOrderHandler}>Đặt hàng</Button>
            </div>
        </section>
    );
};

const OrderListItem = ({ product }) => {
    console.log('orderItem:', product);
    const {
        productVariant: detail,
        price_detail,
        discount_amount,
        quantity,
    } = product;

    const { display_name: name, image } = detail;

    return (
        <li key={product.id}>
            <div className="order-list-card">
                <div className="product-detail">
                    <div className="image">
                        <img src={getImage(image)} alt="" />
                    </div>
                    <div>
                        <h3>{name}</h3>
                        <h5>Số lượng: {quantity}</h5>
                    </div>
                </div>
                <div className="price">
                    {getCurrencyFormatComp(
                        price_detail - discount_amount * quantity,
                    )}
                </div>
                {/* <div className="function">x</div> */}
            </div>
        </li>
    );
};
export default OrderList;
