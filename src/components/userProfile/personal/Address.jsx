import { PlusOutlined } from "@ant-design/icons";
import React, { useState,memo } from "react";
import { Button, Form, Input, Modal } from "antd";
const AddressForm = () => {
  const { TextArea } = Input;
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <Form
      name="complex-form"
      onFinish={onFinish}
      labelCol={{
        span: 0,
      }}
      wrapperCol={{
        span: 24,
      }}
    >
      <Form.Item
        style={{
          marginBottom: 0,
        }}
      >
        <Form.Item
          name="fullname"
          rules={[
            {
              required: true,
            },
          ]}
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
          }}
        >
          <Input placeholder="Họ và tên" />
        </Form.Item>
        <Form.Item
          name="phone-number"
          rules={[
            {
              required: true,
            },
          ]}
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            margin: "0 8px",
          }}
        >
          <Input placeholder="Số điện thoại" />
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Form.Item
          name="city"
          noStyle
          rules={[
            {
              required: true,
              message: "Username is required",
            },
          ]}
        >
          <Input placeholder="Tỉnh/ Thành phố" />
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Form.Item
          name="district"
          noStyle
          rules={[
            {
              required: true,
              message: "Username is required",
            },
          ]}
        >
          <Input placeholder="Quận/ Huyện" />
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Form.Item
          name="ward"
          noStyle
          rules={[
            {
              required: true,
              message: "Username is required",
            },
          ]}
        >
          <Input placeholder="Phường/ Xã" />
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Form.Item
          name="ward"
          noStyle
          rules={[
            {
              required: true,
              message: "Username is required",
            },
          ]}
        >
          <TextArea
            maxLength={100}
            style={{ height: 120, marginBottom: 24, resize: "none" }}
            placeholder="Địa chỉ cụ thể"
          />
        </Form.Item>
      </Form.Item>
    </Form>
  );
};

function Address() {
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false)
  };
  const handleCancel = () => {
    setOpen(false);
  };
  //modal để thê mới và cập nhật địa chỉ
  const ModalAddress = () => {
    return (
      <>
        <Modal
          open={open}
          title="Địa chỉ mới"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Trở lại
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={handleOk}
            >
              Hoàn thành
            </Button>,
          ]}
        >
          <AddressForm />
        </Modal>
      </>
    );
  };
  return (
    <div
      style={{
        width: "100%",
        minHeight: "750px",
        // backgroundColor: "rgba(0,0,0,.09)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          margin: "auto",
          width: 800,
          height: 400,
          boxShadow: "0 1px 2px 0 rgb(0 0 0 / 13%)",
          boxSizing: "border-box",
          backgroundColor: "#fff",
          padding: "50px",
          marginTop: "50px",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3>Địa chỉ của tôi</h3>
            <Button
              style={{ color: "white", backgroundColor: "orangered" }}
              size="middle"
              icon={<PlusOutlined />}
              onClick={showModal}
            >
              Thêm địa chỉ mới
            </Button>
          </div>
          <hr style={{ opacity: 0.2 }} />

          <div style={{ padding: "12px 30px 0" }}>
            <div style={{ marginBottom: "8px", fontSize: "18px" }}>Địa chỉ</div>
            <div style={{ borderBottom: "1px solid rgba(0,0,0,.26)" }}>
              <div style={{ display: "flex" }}>
                <div style={{ minWidth: 0, width: "100%" }}>
                  <div
                    style={{
                      justifyContent: "space-between",
                      marginBottom: "4px",
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        marginRight: "8px",
                        flexGrow: 1,
                        overflowX: "hidden",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{ color: "rgba(0,0,0,.87)", fontSize: "18px" }}
                      >
                        <div>NhatPhu</div>{" "}
                      </span>
                      <div
                        style={{
                          borderLeft: "1px solid rgba(0,0,0,.26)",
                          margin: "0 8px",
                          minHeight: "26px",
                        }}
                      ></div>
                      <div style={{ color: "rgba(0,0,0,.54)" }}>
                        (+84) 344963174
                      </div>
                    </div>
                    <div
                      style={{
                        justifyContent: "flex-end",
                        display: "flex",
                        flexBasis: "40px",
                      }}
                    >
                      <Button type="link" onClick={showModal}>
                        Cập nhật
                      </Button>
                      <Button type="link">Xóa</Button>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ minWidth: 0, width: "100%" }}>
                  <div>3337/2 ấp tân hợp</div>
                  <div>Tô ký quận 12 Thành Phố Hồ Chí Minh</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalAddress />
    </div>
  );
}

export default memo(Address);
