//import React, { useState } from "react"

//const ShopCart = ({ addToCart, shopItems }) => {
//  const [count, setCount] = useState(0)
//  const increment = () => {
//    setCount(count + 1)
//  }

//  return (
//    <>
//      {shopItems.map((shopItems) => {
//        return (
//          <div className='product mtop'>
//            <div className='img'>
//              <span className='discount'>{shopItems.discount}% Off</span>
//              <img src={shopItems.cover} alt='' />
//              <div className='product-like'>
//                <label>{count}</label> <br />
//                <i className='fa-regular fa-heart' onClick={increment}></i>
//              </div>
//            </div>
//            <div className='product-details'>
//              <h3>{shopItems.name}</h3>
//              <div className='rate'>
//                <i className='fa fa-star'></i>
//                <i className='fa fa-star'></i>
//                <i className='fa fa-star'></i>
//                <i className='fa fa-star'></i>
//                <i className='fa fa-star'></i>
//              </div>
//              <div className='price'>
//                <h4>${shopItems.price}.00 </h4>
//                <button onClick={() => addToCart(shopItems)}>
//                  <i className='fa fa-plus'></i>
//                </button>
//              </div>
//            </div>
//          </div>
//        )
//      })}
//    </>
//  )
//}

//export default ShopCart

import React, { useState } from "react";
import { Link } from "react-router-dom";
import HalfRatingRead from "../../common/rating/HalfRatingRead";
import Favorite from "../../common/favorite/Favorite";
const ShopCart = ({ shopItems, addToCart }) => {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };
  const [isFavorite, setFavorite] = useState(false);
  const onChange = (e) => {
    setFavorite(!isFavorite);
  };

  return (
    <>
      {shopItems.map((shopItems, index) => {
        return (
          <div className="box">
            <div className="product mtop">
              <div className="img">
                <span className="discount">{shopItems.discount}% Off</span>
                <Link to={`/product-detail/${shopItems.id}`}>
                  <img src={shopItems.image} alt="" />
                </Link>
                <div className="product-like">
                    <Favorite value={index} onChange={onChange} isFavorite={isFavorite}/>
                </div>
              </div>
              <div className="product-details">
                <Link to={`/product-detail/${shopItems.id}`}>
                  <h3 style={{ color: "black" }}>{shopItems.product_name}</h3>
                </Link>
                <div className="rate">
                  <HalfRatingRead value={shopItems.average_point} />
                </div>
                <div className="price">
                  <h4>${shopItems.price}.00 </h4>
                  {/* step : 3  
                     if hami le button ma click garryo bahne 
                    */}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ShopCart;
