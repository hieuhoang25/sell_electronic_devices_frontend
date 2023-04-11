import React, { useState, memo, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NumericFormat } from 'react-number-format';
import { getImage } from '../../common/img';
import { Link } from 'react-router-dom';
import { FLASH_DEAL, BASE } from '../../constants';
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
const FlashCard = ({ productItems, addToCart }) => {
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
    const handleUpdate = () => {
        setLoading(true);
        axios
            .get(`${BASE}${FLASH_DEAL}`)
            .then((res) => {
                setFlashDeal(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    };

    const renderer = ({ hours, minutes, seconds, completed }) => {
        return (
            <span>
                {zeroPad(hours)} Giờ {zeroPad(minutes)}:{zeroPad(seconds)}
            </span>
        );
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
                            return (
                                <Link
                                    key={index}
                                    to={'/product-detail/' + product.id}
                                >
                                    <div className="box product" key={index}>
                                        <div
                                            className="img"
                                            style={{ height: 180 }}
                                        >
                                            <img
                                                src={getImage(product.image)}
                                                alt="#"
                                                width="100%"
                                            />
                                            {product.discount !== 0 && (
                                                <span
                                                    style={{ color: 'white' }}
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
                                                    date={value.expired_time}
                                                    onComplete={handleUpdate}
                                                    renderer={renderer}
                                                />
                                            </span>
                                        </div>
                                        <h4 style={{ height: 40 }}>
                                            {product.product_name}
                                        </h4>
                                        {product.discount !== 0 ? (
                                            <span>
                                                <NumericFormat
                                                    product={
                                                        product.discount_price
                                                    }
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'VNĐ'}
                                                />
                                            </span>
                                        ) : (
                                            <span>
                                                <NumericFormat
                                                    product={product.price}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'VNĐ'}
                                                />
                                            </span>
                                        )}
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
