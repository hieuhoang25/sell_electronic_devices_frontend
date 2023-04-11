import React from 'react';
import { Button } from 'antd';
import { Col, Row, Space, Input, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { NumericFormat } from 'react-number-format';
import {
    getCurrencyFormatComp,
    CURRENCY_SUFFIX,
    getPromotion,
    getPromotionValue,
    getVariantDetail,
    getColorOfCartItem,
    getDiscountAmountOfItem,
    getPriceDetail,
} from '../../common/Cart/CartUtil';
import { getImage } from '../../common/img';
const OrderList = ({ onClickOrder }) => {
    const Cart = useSelector((state) => {
        return state.cart;
    });
    const { items } = Cart;
    const list = items.map((item, index) => {
        return <OrderListItem key={index} product={item}></OrderListItem>;
    });
    const onOrderHandler = () => {
        onClickOrder();
    };
    return (
        <section className="order-list">
            <h4>
                Đơn hàng{`  `} (<span>{Cart.totalCount}</span>)
            </h4>
            <ul className="order-list-container">{list}</ul>
            <div className="coupon-container">
                <h4 className="coupon-container-title"> Mã giảm giá</h4>

                <Space
                    style={{ marginLeft: '0.5rem', width: '80%' }}
                    direction="horizontal"
                >
                    <Input
                        style={{ width: '100%' }}
                        placeholder="Nhập mã giảm giá"
                    />
                    <Button style={{ width: 80 }}>Áp dụng</Button>
                </Space>
            </div>
            <div className="order-total">
                <div className="box box-quantity">
                    <h3>Số lượng</h3>
                    <div className="quantity">{Cart.totalCount}</div>
                </div>
                <div className="box base">
                    <h3>Tạm tính: </h3>
                    <div className="base">
                        {getCurrencyFormatComp(Cart.baseAmount, true)}
                    </div>
                </div>
                <div className="box dis">
                    <h3>Giảm giá: </h3>
                    <div className="dis">
                        {getCurrencyFormatComp(Cart.discount, true)}
                    </div>
                </div>
                <div className="box dis">
                    <h3>Áp dụng mã giảm: </h3>
                    <div className="dis">
                        {getCurrencyFormatComp(Cart.discount, true)}
                    </div>
                </div>
                <div className="box total">
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
    const variant_detail = getVariantDetail(product);

    const {
        productVariant: detail,
        price_detail,
        discount_amount,
        quantity,
    } = product;

    const { display_name: name, image } = variant_detail;

    return (
        <li key={product.id}>
            <div className="order-list-card">
                <div className="product-detail">
                    <Row>
                        <Col style={{ display: 'flex' }} span={10}>
                            <div className="image">
                                <img src={getImage(image)} alt="" />
                            </div>
                        </Col>
                        <Col span={14}>
                            <div className="product-detail-info">
                                <div className="product-detail-top">
                                    <div className="discount-tag">
                                        {getPromotion(product) && (
                                            <span className="discount-container">
                                                {' '}
                                                Giảm:{' '}
                                                {getPromotionValue(product)}
                                            </span>
                                        )}
                                    </div>
                                    <h3
                                        style={{
                                            fontSize: '16px',
                                            marginTop: '0.5rem',
                                        }}>
                                        {name}
                                    </h3>
                                </div>
                                <div className="product-detail-bottom">
                                    <div className="gen">
                                        <div className="quantity-container">
                                            Số lượng:{' '}
                                            <span className="quantity">
                                                {' '}
                                                {quantity}
                                            </span>
                                        </div>
                                        <div className="price-container">
                                            Giá:{' '}
                                            {getCurrencyFormatComp(
                                                getPriceDetail(product),
                                                false,
                                                'price-per-product',
                                            )}{' '}
                                        </div>
                                        {/* <div>
                                            {getPromotion(product) && (
                                                <span className='discount-container'> Giảm: {getPromotionValue(product)}</span>
                                            )}
                                        </div> */}
                                    </div>

                                    <div className="price">
                                        {getCurrencyFormatComp(
                                            getPriceDetail(product),
                                            false,
                                            'origin-price',
                                        )}
                                        {getCurrencyFormatComp(
                                            getDiscountAmountOfItem(product),
                                            false,
                                            'total',
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </li>
    );
};
export default OrderList;
