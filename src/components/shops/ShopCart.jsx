
import React, { useState } from "react";
import { Link } from "react-router-dom";
import HalfRatingRead from "../../common/rating/HalfRatingRead";
import Favorite from "../../common/favorite/Favorite";
import { NumericFormat } from 'react-number-format';
import { getImage } from "../../common/img";
const ShopCart = ({ shopItems}) => {
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
                <span className="discount">50% Off</span>
                <Link to={`/product-detail/${shopItems.id}`}>
                  <img src={getImage(shopItems.image)} alt="" />
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
                  <h4><NumericFormat value={shopItems.price} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></h4>
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
