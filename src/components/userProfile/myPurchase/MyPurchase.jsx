import { Tabs } from "antd";
import AllPurchase from "./AllPurchase";
import ToPay from "./ToPay";
import Completed from "./Completed";
import Cancelled from "./Cancelled";
import { useState,memo } from "react";
const MyPurchase = () => {
  const items = [
    {
      key: "1",
      label: "Tất cả",
      children: <AllPurchase />,
    },
    {
      key: "2",
      label: "Chờ xác nhận",
      children: <ToPay />,
    },
    {
      key: "3",
      label: "Đang giao",
    },
    {
      key: "4",
      label: "Hoàn thành",
      children: <Completed />,
    },
    {
      key: "5",
      label: "Đã hủy",
      children: <Cancelled />,
    },
  ];
  return (
    <>
      <Tabs
        style={{padding:"20px"}}
        centered
        defaultActiveKey="1"
        tabPosition="top"
        items={items}
      />
    </>
  );
};
export default memo(MyPurchase);
