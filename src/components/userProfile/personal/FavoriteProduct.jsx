import {React,memo} from "react";
import { Card, Col, Row, Button } from "antd";
const FavoriteProduct = () => (
  <div className="site-card-wrapper" style={{ padding: "10px" }}>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span>1 Sản phẩm</span>
      <span>
        <Button type="text" style={{ color: "red" }}>
          Chỉnh sửa
        </Button>{" "}
      </span>
    </div>
    <Row gutter={[16, 24]}>
      <Col span={6}>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={
            <img
              alt="example"
              src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/3/_/3_225.jpg"
            />
          }
        >
          <span>
            <div>Sữa tươi có đường Vinamilk bịch 220ml</div>
            <div style={{ color: "red", fontSize: "14px" }}>đ7.000</div>
            <div style={{ textAlign: "right", fontSize: "13px" }}>
              Đã bán 220 cái
            </div>
            <div style={{ textAlign: "right" }}>
              <Button style={{ backgroundColor: "orangered", color: "white" }}>
                Bỏ thích
              </Button>
            </div>
          </span>
        </Card>
      </Col>
    </Row>
  </div>
);
export default memo(FavoriteProduct);
