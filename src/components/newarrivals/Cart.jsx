import React, { useState, useEffect, memo, useRef } from 'react';
import axios from '../../services/axios';
import { PRODUCT_NEW_ARRIVAL, BASE } from '../../constants';
import { getImage } from '../../common/img';
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';
const Cart = () => {
    const [productArrival, setProductArrival] = useState();
    const [loading, setLoading] = useState(true);
    const size = useRef(10);
    const page = useRef(0);
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
            <div className="content grid product">
                {!loading &&
                    productArrival.map((val, index) => {
                        return (
                            <Link key={index} to={'/product-detail/' + val.id}>
                                <div className="box">
                                    <div className="img">
                                        <img src={getImage(val.image)} alt="" />
                                    </div>
                                    <h4>{val.product_name}</h4>
                                    {val.discount != 0 ? (
                                        <NumericFormat
                                            value={val.discount_price}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'VNĐ'}
                                        />
                                    ) : (
                                        <NumericFormat
                                            value={val.price}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'VNĐ'}
                                        />
                                    )}
                                </div>
                            </Link>
                        );
                    })}
            </div>
        </>
    );
};

export default memo(Cart);
