import { Rate } from "antd";

export default function HalfRatingRead({ value }) {
  return (
    <div>
      <Rate
        allowHalf
        disabled
        defaultValue={1}
        value={value}
        style={{ fontSize: "12px" }}
      />
    </div>
  );
}
