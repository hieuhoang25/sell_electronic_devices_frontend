import { React, memo, useEffect, useState } from "react";
import { Card, Space, Button, List } from "antd";
import { ShopOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
const ToPay = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      "https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo"
    )
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    loadMoreData();
  }, []);
  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 50}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <Card
              style={{ marginBottom: "20px" }}
              title={
                <div style={{ color: "#26aa99" }}>
                  <ShopOutlined /> Chờ xác nhận
                </div>
              }
            >
              <Card type="inner">
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
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                        }}
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
                        <div style={{ margin: "0 0 5px" }}>
                          <div>x1</div>
                        </div>
                      </div>
                    </div>
                    {/*End*/}
                    {/*Giá sản phẩm*/}
                    <div style={{ textAlign: "right" }}>
                      <div>
                        <span style={{ color: "red" }}>đ69.000</span>
                      </div>
                    </div>
                    {/*End*/}
                  </div>
                </div>
                <div
                  style={{
                    borderBottom: "1px solid rgba(0,0,0,.09)",
                    height: "10px",
                  }}
                ></div>

                {/*Sản phẩm 2*/}
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
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                        }}
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
                        <div style={{ margin: "0 0 5px" }}>
                          <div>x1</div>
                        </div>
                      </div>
                    </div>
                    {/*End*/}
                    {/*Giá sản phẩm*/}
                    <div style={{ textAlign: "right" }}>
                      <div>
                        <span style={{ color: "red" }}>đ69.000</span>
                      </div>
                    </div>
                    {/*End*/}
                  </div>
                </div>
                <div
                  style={{
                    borderBottom: "1px solid rgba(0,0,0,.09)",
                    height: "10px",
                  }}
                ></div>
              </Card>

              {/*Tổng giá*/}
              <div style={{ padding: "24px 24px 12px", background: "#fffefb" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      margin: "0 10px 0 0",
                      fontSize: "14px",
                      lineHeight: "20px",
                      color: "rgba(0,0,0,.8)",
                    }}
                  >
                    Tổng cộng:
                  </div>
                  <div
                    style={{
                      fontSize: "24px",
                      color: "#ee4d2d",
                      lineHeight: "30px",
                    }}
                  >
                    đ126.000
                  </div>
                </div>
              </div>
              {/*End*/}
              <div style={{ padding: "24px 24px 12px", background: "#fffefb" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <Space>
                    <Button
                      disabled
                      style={{
                        minWidth: "150px",
                        minHeight: "40px",
                        backgroundColor: "grey",
                        color: "white",
                      }}
                    >
                      Đang xử lý
                    </Button>
                  </Space>
                </div>
              </div>
            </Card>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};
export default memo(ToPay);
