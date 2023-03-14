import React,{memo} from "react";
import ShopCart from "./ShopCart";
import "./style.css";
const Shop = ({ addToCart, shopItems,title}) => {
  return (
    <>
      <section className="shop background">   
        <div className="container">
          <div className="contentWidthHome">
            <div className="heading d_flex">
              <div className="heading-left row  f_flex">
                <h2>{title}</h2>
              </div>
            </div>
            <div className="product-content  grid1">
              <ShopCart addToCart={addToCart} shopItems={shopItems} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default memo(Shop);
