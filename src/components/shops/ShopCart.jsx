import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import HalfRatingRead from "../../common/rating/HalfRatingRead";
import Favorite from "../../common/favorite/Favorite";
import { NumericFormat } from "react-number-format";
import { getImage } from "../../common/img";
const ShopCart = ({ shopItems }) => {
  const [count, setCount] = useState(0);
  const [isFavorite, setFavorite] = useState([]);
  useEffect(() => {
    setFavorite([
      {
        id: 1,
        product_id: 1,
        product_name: "Iphone 67",
        product_image: "iphone-11.jpeg",
        product_category_name: "Laptop gaming",
        updateDate: null,
        createDate: "2023-03-24T07:11:15Z",
      },
      {
        id: 2,
        product_id: 20,
        product_name: "Iphone 11 ",
        product_image: "menu.png",
        product_category_name: "Iphone (IOS)",
        updateDate: null,
        createDate: "2023-03-24T07:12:53Z",
      },
      {
        id: 3,
        product_id: 86,
        product_name: "IP1",
        product_image: "product-86.png",
        product_category_name: "Laptop gaming",
        updateDate: null,
        createDate: "2023-03-24T07:13:02Z",
      },
      {
        id: 4,
        product_id: 87,
        product_name: "Laptop asus",
        product_image: "product-87.png",
        product_category_name: "Laptop gaming",
        updateDate: null,
        createDate: "2023-03-24T07:13:10Z",
      },
    ]);
  }, []);
  const handleChangeFavorite = (e, index, productId) => {
    let existsFavorite = isFavorite.findIndex(item => item.product_id === productId);
    console.log(existsFavorite)
    if(existsFavorite!=-1){
      setFavorite(isFavorite.filter(({product_id}) => product_id !== productId))
    }
    else{
      setFavorite([...isFavorite, { product_id: productId }]);
    }
  };
  return (
    <>
      {shopItems &&
        shopItems.map((shopItems, index) => {
          return (
            <div key={index} className="box">
              <div className="product mtop">
                <div className="img">
                  <span className="discount">50% Off</span>
                  <Link to={`/product-detail/${shopItems.id}`}>
                    <img src={getImage(shopItems.image)} alt="" />
                  </Link>
                  <div className="product-like">
                    <Favorite
                      value={shopItems.id}
                      onChange={(e) =>
                        handleChangeFavorite(e, index, shopItems.id)
                      }
                      isFavorite={isFavorite}
                    />
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
                    <h4>
                      <NumericFormat
                        value={shopItems.price}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={"đ"}
                      />
                    </h4>
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
