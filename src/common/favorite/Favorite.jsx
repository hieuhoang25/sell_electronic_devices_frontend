import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Checkbox } from "antd";
import styled from "styled-components";
const MyCheckBox = styled(Checkbox)`
  &.ant-checkbox-wrapper {
    justify-content: center;
    align-items: center;
  }
  .ant-checkbox {
    display: none;
  }
`;

function Favorite({ onChange, isFavorite ,value}) {
  return (
    <>
      <MyCheckBox
        children={
          isFavorite ? (
            <HeartFilled style={{ color: "red" }} />
          ) : (
            <HeartOutlined />
          )
        }
        onChange={onChange}
        value={value}
      />
    </>
  );
}

export default Favorite;
