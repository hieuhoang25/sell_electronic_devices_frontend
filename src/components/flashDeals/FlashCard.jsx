import React, { useState, memo, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NumericFormat } from 'react-number-format';
import { getImage } from '../../common/img';
import { Link } from 'react-router-dom';
import { FLASH_DEAL, BASE, REMOVING_EXPIRE_FLASH_DEAL } from '../../constants';
import Countdown, {
    zeroPad,
    calcTimeDelta,
    formatTimeDelta,
} from 'react-countdown';
import axios from '../../services/axios';
const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="control-btn" onClick={onClick}>
            <button className="next">
                <i className="fa fa-long-arrow-alt-right"></i>
            </button>
        </div>
    );
};
const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="control-btn" onClick={onClick}>
            <button className="prev">
                <i className="fa fa-long-arrow-alt-left"></i>
            </button>
        </div>
    );
};
const FlashCard = () => {
    const [loading, setLoading] = useState(true);
    const [flashDeal, setFlashDeal] = useState([]);
    useEffect(() => {
        axios
            .get(`${BASE}${FLASH_DEAL}`)
            .then((res) => {
                setFlashDeal(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    }, []);
    function removeExpiredFlashDeal(listProductId) {
        return axios({
            method: 'put',
            url: `${BASE}${REMOVING_EXPIRE_FLASH_DEAL}`,
            data: listProductId,
        });
    }
    const handleUpdate = async (listProduct) => {
        const productsId = listProduct.map((pr) => pr.id);
        console.log(productsId);
        await removeExpiredFlashDeal(productsId);
        setLoading(true);
        await axios
            .get(`${BASE}${FLASH_DEAL}`)
            .then((res) => {
                setFlashDeal(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    };
    const myCustomRendererParam = (start, discount) => {
        const renderer = ({ hours, minutes, seconds, completed }) => {
            if (start) {
                return (
                    <span>
                        {zeroPad(hours)} Giờ {zeroPad(minutes)}:
                        {zeroPad(seconds)}
                    </span>
                );
            }
            if (!start) {
                return (
                    <span>
                        Giảm {discount} Sẽ Bắt đầu Sau {zeroPad(hours)} Giờ{' '}
                        {zeroPad(minutes)}:{zeroPad(seconds)} Nữa!!
                    </span>
                );
            }
        };
        return renderer;
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };
    return (
        <>
            <Slider {...settings}>
                {!loading &&
                    flashDeal.length !== 0 &&
                    flashDeal.map((value, index) => {
                        return value.products.map((product, index) => {
                            if (value.start)
                                return (
                                    <Link
                                        key={index}
                                        to={'/product-detail/' + product.id}
                                    >
                                        <div
                                            className="box product"
                                            key={index}
                                        >
                                            <div
                                                className="img"
                                                style={{ height: 180 }}
                                            >
                                                <img
                                                    src={getImage(
                                                        product.image,
                                                    )}
                                                    alt="#"
                                                    width="100%"
                                                />
                                                {product.discount !== 0 && (
                                                    <span
                                                        style={{
                                                            color: 'white',
                                                        }}
                                                        className="discount"
                                                    >
                                                        -{product.discount}% Off
                                                    </span>
                                                )}
                                                <span
                                                    style={{ color: 'white' }}
                                                    className="countdown"
                                                >
                                                    <Countdown
                                                        date={
                                                            value.expired_time
                                                        }
                                                        onComplete={() =>
                                                            handleUpdate(
                                                                value.products,
                                                            )
                                                        }
                                                        renderer={myCustomRendererParam(
                                                            value.start,
                                                            value.name,
                                                        )}
                                                    />
                                                </span>
                                            </div>
                                            <h4 style={{ height: 40 }}>
                                                {product.product_name}
                                            </h4>
                                            <span>
                                                {product.discount_price != 0 ? (
                                                    <NumericFormat
                                                        value={
                                                            product.discount_price
                                                        }
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        suffix={' VNĐ'}
                                                    />
                                                ) : (
                                                    <NumericFormat
                                                        value={product.price}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        suffix={' VNĐ'}
                                                    />
                                                )}
                                            </span>
                                        </div>
                                    </Link>
                                );
                        });
                    })}
            </Slider>
            <h1>Khuyến mãi sắp tới!</h1>
            <Slider {...settings}>
                {!loading &&
                    flashDeal.length !== 0 &&
                    flashDeal.map((value, index) => {
                        return value.products.map((product, index) => {
                            if (!value.start)
                                return (
                                    <Link
                                        key={index}
                                        to={'/product-detail/' + product.id}
                                    >
                                        <div
                                            className="box product"
                                            key={index}
                                        >
                                            <div
                                                className="img"
                                                style={{ height: 180 }}
                                            >
                                                <img
                                                    src={getImage(
                                                        product.image,
                                                    )}
                                                    alt="#"
                                                    width="100%"
                                                />
                                                {product.discount !== 0 && (
                                                    <span
                                                        style={{
                                                            color: 'white',
                                                        }}
                                                        className="discount"
                                                    >
                                                        -{product.discount}% Off
                                                    </span>
                                                )}
                                                <span
                                                    style={{ color: 'white' }}
                                                    className="countdown"
                                                >
                                                    <Countdown
                                                        date={
                                                            value.expired_time
                                                        }
                                                        onComplete={
                                                            handleUpdate
                                                        }
                                                        renderer={myCustomRendererParam(
                                                            value.start,
                                                            value.name,
                                                        )}
                                                    />
                                                </span>
                                            </div>
                                            <h4 style={{ height: 40 }}>
                                                {product.product_name}
                                            </h4>
                                            <span>
                                                {product.discount_price != 0 ? (
                                                    <NumericFormat
                                                        value={
                                                            product.discount_price
                                                        }
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        suffix={' VNĐ'}
                                                    />
                                                ) : (
                                                    <NumericFormat
                                                        value={product.price}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        suffix={' VNĐ'}
                                                    />
                                                )}
                                            </span>
                                        </div>
                                    </Link>
                                );
                        });
                    })}
            </Slider>
        </>
    );
};

export default memo(FlashCard);
