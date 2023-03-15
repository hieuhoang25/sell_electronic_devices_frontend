import Review from "./Review";
import React,{memo} from "react";
import { Tabs } from "antd";
const onChange = (key) => {
  console.log(key);
};
const TabReviewAndDescription = ({ listReview, description, handleClick }) => (
  <Tabs
    defaultActiveKey="1"
    items={[
      {
        key: "1",
        label: `Mô tả`,
        children: `Mô tả`,
      },
      {
        key: "2",
        label: `Đánh giá`,
        children: <Review handleClick={handleClick} listReview={listReview} />,
      },
    ]}
    onChange={onChange}
  />
);
export default memo(TabReviewAndDescription);
