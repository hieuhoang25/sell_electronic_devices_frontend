import { React, useState } from "react";
import { Col, Row, Card, Button, Checkbox, Space, Radio, Form } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import HalfRatingRead from "../../common/rating/HalfRatingRead"
import axios from "axios";
import CustomizedNotification from "../../common/notification/Notification";
import ListSpecification from "./ListSpecification";
import TabReviewAndDescription from "./TabReviewAndDescription";
import RatingForm from "../../common/rating/RatingForm";
const ProductDetail = () => {
  //Mở form đánh giá
  const [isModalOpen, setIsModalOpen] = useState(false);
  const rate = () => {
    setIsModalOpen(true);
  };
  const handleFinish = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //End

  const handleAddToCart = () =>{
    console.log("Đã thêm vào giỏ");
  }


  const [isFavorite, setFavorite] = useState(false);
  const handleClick = () => {
    setFavorite(!isFavorite);
  };
  //data review
  const data = [
    {
      userName: "Nhật Phú",
      reviewAt: "Hôm nay lúc 3:40",
      content: "Sản phẩm tốt quá",
      ratingPoint: 4,
    },
    {
      userName: "Nhật Phú",
      reviewAt: "Hôm nay lúc 3:40",
      content: "Sản phẩm tốt quá",
      ratingPoint: 4,
    },
  ];
  return (
    <div style={{marginTop:"5rem",marginBottom:"5rem"}}>
      <Row>
        <Col span={15} offset={6}>
          <div
            style={{
              display: "flex",
              p: 1,
              padding: "0px",
              flexDirection: {
                xs: "column", // mobile
                sm: "row", // tablet and up
              },
            }}
          >
            <div style={{ position: "relative", display: "inline-block" }}>
              <img
                width="300"
                height="300"
                alt="example"
                src="https://cdn2.cellphones.com.vn/358x/media/catalog/product/v/a/vang-iphone-14-pro_5.png"
              />
              <div
                style={{
                  position: "absolute",
                  zIndex: 2,
                  borderRadius: "50%",
                  right: "20rem",
                  top: 0,
                  transform: "translateY(50%)",
                }}
              >
                <Button
                  onClick={handleClick}
                  shape="circle"
                  icon={
                    isFavorite ? (
                      <HeartFilled style={{ color: "red" }} />
                    ) : (
                      <HeartOutlined />
                    )
                  }
                />
              </div>
            </div>

            <div style={{ marginLeft: 2 }}>
              {/*Ten va so sao san pham*/}
              <div>
                iPhone 14 Pro 128GB | Chính hãng VN/A{" "}
                <HalfRatingRead value={3.5} />
              </div>
              {/*Gia san pham*/}
              <div>
                <span style={{ color: "red", marginRight: "5px" }}>
                  28.990.000 ₫
                </span>
                <span style={{ textDecoration: "line-through" }}>
                  30.990.000 ₫
                </span>
              </div>
              {/*Phần ram và dung lượng*/}
              <Form
                name="validate_other"
                initialValues={{
                  "input-number": 3,
                  "checkbox-group": ["A", "B"],
                  rate: 3.5,
                }}
              >
                <Form.Item
                  name="radio-button"
                  rules={[
                    {
                      required: true,
                      message: "Please pick an item!",
                    },
                  ]}
                >
                  <Radio.Group>
                    <Space wrap size={[5, 12]} style={{ width: "400px" }}>
                      <Radio.Button style={{ height: "50px" }} value="a">
                        <div
                          style={{ textAlign: "center", lineHeight: "22px" }}
                        >
                          <div>256 GB</div>
                          <div>19.000.000 đ</div>
                        </div>
                      </Radio.Button>
                      <Radio.Button style={{ height: "50px" }} value="b">
                        <div
                          style={{ textAlign: "center", lineHeight: "22px" }}
                        >
                          <div>256 GB</div>
                          <div>19.000.000 đ</div>
                        </div>
                      </Radio.Button>
                      <Radio.Button style={{ height: "50px" }} value="c">
                        <div
                          style={{ textAlign: "center", lineHeight: "22px" }}
                        >
                          <div>256 GB</div>
                          <div>19.000.000 đ</div>
                        </div>
                      </Radio.Button>
                    </Space>

                    {/*Phần màu sản phẩm nếu có*/}

                    <Space wrap size={[1, 1]} style={{ width: "400px" }}>
                      <div style={{ padding: "15px" }}>Chọn màu để xem giá</div>
                      <Space wrap size={[5, 12]} style={{ width: "400px" }}>
                        <Radio.Button style={{ height: "50px" }} value="a">
                          <div
                            style={{ textAlign: "center", lineHeight: "22px" }}
                          >
                            <div>256 GB</div>
                            <div>19.000.000 đ</div>
                          </div>
                        </Radio.Button>
                        <Radio.Button style={{ height: "50px" }} value="b">
                          <div
                            style={{ textAlign: "center", lineHeight: "22px" }}
                          >
                            <div>256 GB</div>
                            <div>19.000.000 đ</div>
                          </div>
                        </Radio.Button>
                        <Radio.Button style={{ height: "50px" }} value="c">
                          <div
                            style={{ textAlign: "center", lineHeight: "22px" }}
                          >
                            <div>256 GB</div>
                            <div>19.000.000 đ</div>
                          </div>
                        </Radio.Button>
                      </Space>
                    </Space>
                  </Radio.Group>
                </Form.Item>
              </Form>
              {/*Them vaoo gio*/}
              <div style={{ padding: "5px" }}>
                <CustomizedNotification
                  buttonContent="Thêm vào giỏ"
                  handleClick={handleAddToCart}
                  type="success"
                  placement="bottomRight"
                  message="Đã thêm vào giỏ"
                  style={{ width: "90%" }}
                />
              </div>
            </div>
            {/*Thông số kỹ thuật*/}
            <div style={{ width: "100%" }}>
              <div>Thông số kỹ thuật</div>
              <ListSpecification />
            </div>
            {/*Đánh giá và mô tả*/}
          </div>
          <TabReviewAndDescription handleClick={rate} listReview={data} />
        </Col>
        <RatingForm
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          handleFinish={handleFinish}
          isLoading={false}
        />
      </Row>
    </div>
  );
};
export default ProductDetail;
