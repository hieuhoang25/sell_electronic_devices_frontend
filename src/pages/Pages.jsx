import React, { memo, useState, useEffect } from "react";
import Home from "../components/MainPage/Home";
import FlashDeals from "../components/flashDeals/FlashDeals";
import TopCate from "../components/top/TopCate";
import NewArrivals from "../components/newarrivals/NewArrivals";
import Discount from "../components/discount/Discount";
import Shop from "../components/shops/Shop";
import Annocument from "../components/annocument/Annocument";
import Wrapper from "../components/wrapper/Wrapper";
import ShopHome from "../components/shops/ShopHome";
import TopSales from "../components/topsales/TopSales";
import CategorySlider from "../components/categoryslider/CategorySlider";
import axios from "axios";
import { BASE, PRODUCT, FILTER } from "../constants/index";
const Pages = ({ productItems, addToCart, CartItem }) => {
  const size = 10;
  const [smartphones, setSmartPhones] = useState([]);
  const [laptop, setLaptop] = useState([]);
  //fetch smartPhones
  useEffect(() => {
    axios({
      method: "post",
      url: `${BASE}${PRODUCT}${FILTER}`,
      data: [
        {
          key: "category",
          value: 1,
          operation: "EQUAL",
        },
      ],
      params: { size: size, page: 0 },
    })
      .then((res) => {
        setSmartPhones(() => res.data.data);
        return res.data;
      })
      .catch((error) => error);
  }, []);
  //fetch laptop
  useEffect(() => {
    axios({
      method: "post",
      url: `${BASE}${PRODUCT}${FILTER}`,
      data: [
        {
          key: "category",
          value: 2,
          operation: "EQUAL",
        },
      ],
      params: { size: size, page: 0 },
    })
      .then((res) => {
        setLaptop(() => res.data.data);
        return res.data;
      })
      .catch((error) => error);
  }, []);
  return (
    <>
      <Home CartItem={CartItem} />
      <FlashDeals productItems={productItems} addToCart={addToCart} />
      <TopCate />
      <NewArrivals />
      <Discount />
      <TopSales addToCart={addToCart} />
      <CategorySlider />
      <ShopHome shopItems={smartphones} title={"Điện thoại"} />
      <ShopHome shopItems={laptop} title={"Laptop"} />
      <Annocument />
      <Wrapper />
    </>
  );
};

export default memo(Pages);
