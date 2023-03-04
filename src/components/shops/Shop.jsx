import React from "react";
import Catg from "./Catg";
import ShopCart from "./ShopCart";
import "./style.css";
import { Select, Space, Pagination } from "antd";
const Shop = ({ addToCart, shopItems }) => {
  const SortingCombox = () => {
    const handleChange = (value) => {
      console.log(`selected ${value}`);
    };
    return (
      <Space wrap>
        <Select
          defaultValue="Bán chạy"
          style={{
            width: 150,
          }}
          onChange={handleChange}
          options={[
            {
              value: "Bán chạy",
              label: "Bán chạy",
            },
            {
              value: "price asc",
              label: "Giá cao đến thấp",
            },
            {
              value: "price desc",
              label: "Giá thấp đến cao",
            },
            {
              value: "discount",
              label: "Giảm giá",
            },
            {
              value: "discount",
              label: "Đánh giá",
            },
          ]}
        />
      </Space>
    );
  };

  return (
    <>
      <section className="shop background">
        <div className="container d_flex">
          <Catg />

          <div className="contentWidth">
            <div className="heading d_flex">
              <div className="heading-left row  f_flex">
                <h2>Mobile Phones</h2>
              </div>
              <SortingCombox />
            </div>
            <div className="product-content  grid1">
              <ShopCart addToCart={addToCart} shopItems={shopItems} />
            </div>
            <Pagination
              className="result-pagination"
              total={85}
              showSizeChanger
              showQuickJumper
              style={{ textAlign: "center" }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
