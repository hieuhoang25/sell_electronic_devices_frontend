import React from "react";
import { Button } from 'antd';
const OrderList = ({ CartItem }) => {
  console.log(CartItem);
  const list = CartItem.map((item) => {
    return <OrderListItem product={item}></OrderListItem>;
  });
  return (
    <section className="order-list">
      <h4>Đơn hàng</h4> 
      <ul>{list}</ul>
      <div className="order-total">
      <div className="box">
      <h3>Số lượng</h3>
      <div className="total">100$</div>
      </div>
      <div className="box">
      <h3>Tổng tiền</h3> 
        <div className="total">100$</div>
      </div>
     
      
      </div>
      <div className="order-btn">
      <Button >Đặt hàng</Button>
      </div>
    </section>
  );
};

const OrderListItem = ({ product }) => {
  return (
    <li key={product.id}>
      <div className="order-list-card">
      <div className="product-detail">
      <div className="image">
          <img src={product.cover} alt="" />
        </div>
        <div >
        <h3>{product.name}</h3> 
        <h5>Số lượng: {product.qty}</h5>
        </div>
       
      </div>  
        <div className="price">101.00</div>
        <div className="function">x</div>
      </div>
    
    </li>
  );
};
export default OrderList;
