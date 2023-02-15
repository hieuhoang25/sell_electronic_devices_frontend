import React from "react";
import { Col, Row, Space } from "antd";
import { Select } from "antd";
import ProductResult from "./ProductResult";
import { Pagination } from "antd";
import FilterPanel from "./FilterPanel";
import "./style.css";

import Sdata from "../shops/Sdata";
const CategoryPage = () => {
  const { shopItems } = Sdata;
  return (
    <section className="container page">
      <Row className="bread-row">
        <Col>breadcrm</Col>
      </Row>
      <Row>
      <Col span={16}>
        Category's Name
      </Col>
      </Row>
      <Row gutter={16}>
        <Col className="col-3" span={8}>
          <FilterPanel></FilterPanel>
        </Col>
        {/* <Col span={9}>col-6</Col> */}

        <Col className="col-14" span={16}>
          <Row
            style={{
              margin: "1rem auto 1rem",
              borderBottom: "1px solid grey",
              padding: "0 0 0.4rem"
            }}
            justify="space-between"
          >
            <Col>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold"
                }}
              >
                {" "}
                Số lượng: {shopItems.length}
              </div>
            </Col>
            <Col>
              <SortingCombox></SortingCombox>
            </Col>
          </Row>

          <ProductResult productItems={shopItems} />
          <Pagination
            className="result-pagination"
            total={85}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `Total ${total} items`}
          />
        </Col>
        {/* <Col className='col-3' span={3}>col-3</Col> */}
      </Row>
    </section>
  );
};

export const SortingCombox = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <Space wrap>
      <Select
        defaultValue="Bán chạy"
        style={{
          width: 150
        }}
        onChange={handleChange}
        options={[
          {
            value: "Bán chạy",
            label: "Bán chạy"
          },
          {
            value: "price asc",
            label: "Giá cao đến thấp"
          },
          {
            value: "price desc",
            label: "Giá thấp đến cao"
          },
          {
            value: "discount",
            label: "Giảm giá"
          },
          {
            value: "discount",
            label: "Đánh giá"
          }
        ]}
      />
    </Space>
  );
};
export default CategoryPage;
