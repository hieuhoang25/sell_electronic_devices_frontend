import React, { useState, useEffect, memo, useRef } from 'react';
import axios from '../../services/axios';
import { PRODUCT_NEW_ARRIVAL, BASE } from '../../constants';
import { getImage } from '../../common/img';
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
const Cart = () => {
    const [productArrival, setProductArrival] = useState();
    const [loading, setLoading] = useState(true);
    const size = useRef(10);
    const page = useRef(0);
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
    };
    useEffect(() => {
        axios
            .get(`${BASE}${PRODUCT_NEW_ARRIVAL}`, {
                params: {
                    page: page.current,
                    size: size.current,
                },
            })
            .then((res) => {
                const value = res.data;
                console.log(value.data);
                setProductArrival(value.data);
                setLoading(false);
            })
            .catch((err) => {
                // console.log(err);
                setLoading(false);
            });
    }, []);
    return (
        <>
            <Slider {...settings}>
                {!loading &&
                    productArrival.map((value, index) => {
                        return (
                            <Link
                                key={index}
                                to={'/product-detail/' + value.id}
                            >
                                <div className="box product" key={index}>
                                    <div className="img">
                                        <img
                                            src={getImage(value.image)}
                                            alt=""
                                            width="100%"
                                        />
                                        {value.discount != 0 && (
                                            <span
                                                style={{ color: 'white' }}
                                                className="discount"
                                            >
                                                -{value.discount}% Off
                                            </span>
                                        )}
                                    </div>
                                    <h4>{value.product_name}</h4>
                                    {value.discount != 0 ? (
                                        <span>
                                            <NumericFormat
                                                value={value.discount_price}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'VNĐ'}
                                            />
                                        </span>
                                    ) : (
                                        <span>
                                            <NumericFormat
                                                value={value.price}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'VNĐ'}
                                            />
                                        </span>
                                    )}
                                </div>
                            </Link>
                        );
                    })}
            </Slider>
        </>
    );
};

export default memo(Cart);
