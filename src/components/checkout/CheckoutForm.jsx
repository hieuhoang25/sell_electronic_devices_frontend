import React from "react";
import { Col, Row, Space } from "antd";
import { Button, Checkbox, Form, Input, Radio, Select } from "antd";

const payData = [
  { p_id: 1, name: "VISA" },
  { p_id: 2, name: "COD" },
  { p_id: 3, name: "Ví điện tử" }
];

const CheckoutForm = () => {
  return (
    <section className="checkout-form">
      <Row justify="center" className="form_row" gutter={[22, 22]}>
        <Col span={22} className="form_col">
          <Form layout="vertical" name="basic">
           <h4>Phương thức thanh toán</h4>
            <Form.Item name="payment" className="payment-form">
              <Radio.Group>
                <Space direction="vertical">
                  {payData.map((item) => {
                    return <Radio key={item.p_id} value={item.p_id}>{item.name}</Radio>;
                  })}
                  {/* <Radio value={1}>Option A</Radio>
                  <Radio value={2}>Option B</Radio>
                  <Radio value={3}>Option C</Radio> */}
                </Space>
              </Radio.Group>
            </Form.Item>

            {/* <div> */}
            <Row className="form_row contact-info">
              <Col span={24} className="form_col">
                <h4>Thông tin khách hàng</h4>
                <div className="">
                  <span>Email:</span>
                  <span>Phone:</span>
                </div>
              </Col>
              {/* <Col span={6}>Phone:</Col>  */}
            </Row>
            <h4>Địa chỉ giao hàng</h4>
            <Form.Item name="address">      
              <Input
                placeholder="Địa chỉ"
                style={{ width: "100%", marginBottom: "0.5rem" }}
              />
            </Form.Item>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item name="province">
                  <Input placeholder="Tỉnh/Thành" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="district">
                  <Input placeholder="Quận/Huyện" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="ward">
                  <Input placeholder="Phường/Xã" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="zip">
                  <Input placeholder="Zip code" />
                </Form.Item>
              </Col>

            
            </Row>

            {/* </div> */}
          </Form>
        </Col>
        
        <Col className="discount-section"  span={22}>
        Mã giảm giá
        <Space style={{marginLeft: "0.5rem", width: "80%"}} direction="horizontal">
        <Input style={{ width: "100%"}}
          placeholder="Nhập mã giảm giá"
        />
        <Button style={{ width: 80 }}>
        Áp dụng
        </Button>
      </Space>
        </Col>
      </Row>
    </section>
  );
};
export default CheckoutForm;
