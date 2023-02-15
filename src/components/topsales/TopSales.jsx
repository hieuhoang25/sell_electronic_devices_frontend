import React from "react"

import "./style.css"
import Card from "../UI/Card";
import Sdata from "../shops/Sdata";

const TopSales = ({addToCart}) => {

  // list
  const {shopItems} = Sdata;

  return (
    <>
      <section className='TopSales background'>
        <div className='container'>
          <div className='heading d_flex'>
            <div className='heading-left row  f_flex'>
              <img src='https://img.icons8.com/glyph-neue/64/26e07f/new.png' />
              <h2>Tops Sales </h2>
            </div>
            <div className='heading-right row '>
              <span className="expand-link">View all</span>
              <i className='fa-solid fa-caret-right'></i>
            </div>
          </div>

          <div className="product-content  grid5">
          {shopItems.map((shopItems, index) => {
           return <Card shopItems={shopItems} addToCart={addToCart} />
          })}
          </div>
          
        </div>
      </section>
    </>
  )
}

export default TopSales;
