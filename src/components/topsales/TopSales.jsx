import React, { useEffect, memo, useState } from 'react';

import './style.css';
import Card from '../UI/Card';
import Sdata from '../shops/Sdata';
import ShopHome from '../shops/ShopHome';
import axios from '../../services/axios';
import { PRODUCT_TOP_SALES, BASE } from '../../constants';
const TopSales = ({ addToCart }) => {
    const [topSales, setTopSales] = useState();
    // list
    const { shopItems } = Sdata;
    useEffect(() => {
        axios.get(`${BASE}${PRODUCT_TOP_SALES}`).then((res) => {
            // alert(res.data);
            setTopSales(res.data);
        });
    }, []);
    return (
        <>
            <section className="TopSales background">
                <div className="container">
                    <div className="heading d_flex">
                        <div className="heading-left row  f_flex">
                            <img src="https://img.icons8.com/glyph-neue/64/26e07f/new.png" />
                            <h2>Tops Sales </h2>
                        </div>
                        <div className="heading-right row ">
                            <span className="expand-link">View all</span>
                            <i className="fa-solid fa-caret-right"></i>
                        </div>
                    </div>
                    <ShopHome shopItems={shopItems} />
                </div>
            </section>
        </>
    );
};

export default memo(TopSales);
