import React, { useState, memo, useEffect } from "react";
import { Button, Modal } from "antd";
import Rater from "./Rater";
import { Input } from "antd";
const { TextArea } = Input;

const RatingForm = ({ isModalOpen, handleCancel, handleFinish, isLoading }) => {
  return (
    <>
      <Modal
        title="Đánh Giá Sản Phẩm"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Trờ lại
          </Button>,
          <Button
            loading={isLoading}
            key="submit"
            type="primary"
            onClick={handleFinish}
          >
            Hoàn thành
          </Button>,
        ]}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              flexWrap: "nowrap",
              padding: "12px 0 0",
            }}
          >
            {/*Hình sản phẩm*/}
            <div
              style={{
                width: "80px",
                height: "80px",
                flexShrink: 0,
                border: "1px solid #e1e1e1",
              }}
            >
              <div
                className="img-wrapper"
                style={{ position: "relative", width: "100%", height: "100%" }}
              >
                <div
                  style={{
                    backgroundImage:
                      "url(https://cdn2.cellphones.com.vn/358x/media/catalog/product/x/n/xnnah_kas_4.png)",
                    backgroundPosition: "50%",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                ></div>
              </div>
            </div>
            {/*End Hình sản phẩm*/}

            {/*Tên số lượng và variation*/}
            <div
              style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "0 0 0 12px",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "16px",
                    lineHeight: "22px",
                    margin: "0 0 5px",
                  }}
                >
                  <span style={{ verticalAlign: "middle" }}>
                    Mì ramen thanh 2*85g nhiều vị
                  </span>
                </div>
                <div style={{ margin: "0 0 5px" }}>
                  <div>Variation: Vị truyền thống</div>
                </div>
              </div>
            </div>
            {/*End*/}
          </div>
        </div>
        {/*Chất lượng sản phẩm*/}
        <div>
          <span style={{ marginRight: "10px" }}>Chất lượng sản phẩm</span>
          <span>
            <Rater value={4} />
          </span>
        </div>

        <TextArea rows={4} placeholder="Tối đa 150 từ" maxLength={150} />
      </Modal>
    </>
  );
};
export default memo(RatingForm);
