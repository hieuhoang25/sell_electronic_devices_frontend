import React from "react";
import { Col, Row, Space, Card, Checkbox } from "antd";

const FilterPanel = () => {
  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
  };

  const color = [
    { value: "vàng", label: "Vàng" },
    { value: "Đen", label: "Đen" }
  ];

  return (
    <div className="sticky-container">
      <Row className="filter-panel" gutter={22}>
        <Col span={22}>
          <Card title="Danh mục" bordered={false}>
            <ul>
              Danh sáchh danh mục con nếu có
              <li>...</li>
              <li>,,,</li>
            </ul>
          </Card>
        </Col>
        <Col span={22}>
          <Card title="Card title" bordered={false}>
            product-variant-Attribute (Màu, add theo loop?)
            <Checkbox.Group
              style={{
                width: "100%"
              }}
              onChange={onChange}
            >
              <Row gutter={16}>
                {color.map((item) => {
                  return (
                    <Col span={16}>
                      <Checkbox value={item.value}>{item.label}</Checkbox>
                    </Col>
                  );
                })}
              </Row>
            </Checkbox.Group>
          </Card>
        </Col>
        <Col span={22}>
          <Card title="Giá" bordered={false}>
          
          </Card>
        </Col>
        <Col span={22}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={22}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={22}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default FilterPanel;
