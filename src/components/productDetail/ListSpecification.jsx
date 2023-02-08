import React, { useEffect, useState } from "react";
import { Avatar, List, message, Typography } from "antd";
import VirtualList from "rc-virtual-list";
const fakeDataUrl =
  "https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo";
const ContainerHeight = 280;
const ListSpecification = () => {
  const [data, setData] = useState([
    "Racing car sprays burning fuel into crowd.",
    "Japanese princess to wed commoner.",
    "Australian walks 100km after outback crash.",
    "Man charged over missing wedding girl.",
    "Los Angeles battles huge wildfires.",
  ]);

  useEffect(() => {}, []);
  const onScroll = (e) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      ContainerHeight
    ) {
    }
  };
  return (
    <List>
      <VirtualList
        data={data}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="email"
        onScroll={onScroll}
        style={{ border: "1px solid", borderRadius: "10px" }}
      >
        {(item) => (
          <List.Item>
            <Typography.Text mark>[ITEM]</Typography.Text> {item}
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};
export default ListSpecification;
