import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Tree } from "antd";
import { Slider } from "antd";
import { Checkbox, Col, Row } from "antd";
import styled from "styled-components";
const onChange = (checkedValues) => {
  console.log("checked = ", checkedValues);
};
const PriceRange = () => {
  const marks = {
    500000: "500,000",
    43000000: {
      style: {
        color: "#f50",
      },
      label: <strong>43,000,000</strong>,
    },
  };
  return (
    <Slider
      range={{
        draggableTrack: true,
      }}
      min={500000}
      max={43000000}
      marks={marks}
    />
  );
};

const treeData = [
  {
    title: "parent 1",
    key: "0-0",
    children: [
      {
        title: "parent 1-0",
        key: "0-0-0",
        children: [
          {
            title: "leaf",
            key: "0-0-0-0",
          },
          {
            title: "leaf",
            key: "0-0-0-1",
          },
          {
            title: "leaf",
            key: "0-0-0-2",
          },
        ],
      },
      {
        title: "parent 1-1",
        key: "0-0-1",
        children: [
          {
            title: "leaf",
            key: "0-0-1-0",
          },
        ],
      },
      {
        title: "parent 1-2",
        key: "0-0-2",
        children: [
          {
            title: "leaf",
            key: "0-0-2-0",
          },
          {
            title: "leaf",
            key: "0-0-2-1",
          },
        ],
      },
    ],
  },
];
const Category = () => {
  const onSelect = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };
  return (
    <Tree
      showLine
      switcherIcon={<DownOutlined />}
      defaultExpandedKeys={["0-0-0"]}
      onSelect={onSelect}
      treeData={treeData}
    />
  );
};
const Catg = () => {
  const MyCheckBox = styled(Checkbox)`
    &.ant-checkbox-wrapper {
      width: 90px;
      height: 35px;

      justify-content: center;
      align-items: center;

      border: 1px solid rgba(0, 0, 0, 0.15);
    }

    &.ant-checkbox-wrapper-checked {
      background-color: #1890ff;
      color: #fff;
    }

    .ant-checkbox {
      display: none;
    }
  `;
  const data = [
    {
      cateImg: "./images/category/cat-1.png",
      cateName: "Apple",
    },
    {
      cateImg: "./images/category/cat-2.png",
      cateName: "Samasung",
    },
    {
      cateImg: "./images/category/cat-1.png",
      cateName: "Oppo",
    },
    {
      cateImg: "./images/category/cat-2.png",
      cateName: "Vivo",
    },
    {
      cateImg: "./images/category/cat-1.png",
      cateName: "Redimi",
    },
    {
      cateImg: "./images/category/cat-2.png",
      cateName: "Sony",
    },
  ];
  return (
    <>
      <div className="filter">
        <div className="">
          <h3>Danh mục</h3>
          <Category />
        </div>
        <div>
          <h3>Giá</h3>
          <PriceRange />
        </div>
        <div>
          <h3>Hãng</h3>
          <Checkbox.Group
            style={{
              width: "100%",
            }}
            onChange={onChange}
          >
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <MyCheckBox style={{ margin: "10px" }} value={1}>
                Samsung
              </MyCheckBox>
              <MyCheckBox style={{ margin: "10px" }} value={2}>
                Samsung
              </MyCheckBox>
              <MyCheckBox style={{ margin: "10px" }} value={3}>
                Samsung
              </MyCheckBox>
              <MyCheckBox style={{ margin: "10px" }} value={4}>
                Samsung
              </MyCheckBox>
            </div>
          </Checkbox.Group>
        </div>
        <div>
          <h3>Dung lượng</h3>
          <Checkbox.Group
            style={{
              width: "100%",
            }}
            onChange={onChange}
          >
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <MyCheckBox style={{ margin: "10px" }} value={1}>
                Samsung
              </MyCheckBox>
              <MyCheckBox style={{ margin: "10px" }} value={2}>
                Samsung
              </MyCheckBox>
              <MyCheckBox style={{ margin: "10px" }} value={3}>
                Samsung
              </MyCheckBox>
              <MyCheckBox style={{ margin: "10px" }} value={4}>
                Samsung
              </MyCheckBox>
            </div>
          </Checkbox.Group>
        </div>
      </div>
    </>
  );
};

export default Catg;
