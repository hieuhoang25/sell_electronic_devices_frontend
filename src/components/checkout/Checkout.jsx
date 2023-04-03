import React from "react";
import { Col,  Row } from 'antd';
import CheckoutForm from './CheckoutForm';
import OrderList from './OrderList';
import "./style.css";

// const style = {
//     background: '#0092ff',
//     padding: '8px 0',
//   };

const paymentData = [
    {p_id: 1, name: 'VISA/MASTER Card'}
];

const Checkout = () => {

  return (
    <section className="main-section">
    <Row justify="center" gutter={16}>
    <Col className="gutter-row" span={12}>
        <CheckoutForm></CheckoutForm>
    </Col>
    <Col className="gutter-row" span={8}>
     <OrderList ></OrderList>
    </Col>
    
  </Row>
  </section>
  )
}
export default Checkout;