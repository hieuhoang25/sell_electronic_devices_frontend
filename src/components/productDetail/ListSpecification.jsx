import { IdcardFilled } from "@ant-design/icons";
import React, { useEffect, useState,memo } from "react";
const fakeDataUrl =
  "https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo";
const ContainerHeight = 280;
const ListSpecification = ({data}) => {
  // const onScroll = (e) => {
  //   if (
  //     e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
  //     ContainerHeight
  //   ) {
  //   }
  // };
  return (
    <table>
      <thead>
        <tr>
          <th>Thông số kỹ thuật</th>
          <th>Chi tiết</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ id,attribute_name, attribute_value }) => (
          <tr key={id}>
            <td>{attribute_name}</td>
            <td>{attribute_value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default memo(ListSpecification);
