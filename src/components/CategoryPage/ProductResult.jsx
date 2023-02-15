import React from 'react'
import Card from '../UI/Card';
import { Col, Row, Space } from 'antd';
import Sdata from "../shops/Sdata";


const ProductResult = ({productItems}) => {

   const addToCart = () => {};

  return (
   <Row className='result' gutter={16} style={{width: "100%"}}>
   
    {productItems.slice(2).map((shopItems, index) => {
        return <Col span={8}> <Card shopItems={shopItems} addToCart={addToCart} /> </Col>
       })}

   </Row>
  );
}
export default ProductResult