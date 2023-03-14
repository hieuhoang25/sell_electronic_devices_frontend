import React,{memo} from "react"
import Home from "../components/MainPage/Home"
import FlashDeals from "../components/flashDeals/FlashDeals"
import TopCate from "../components/top/TopCate"
import NewArrivals from "../components/newarrivals/NewArrivals"
import Discount from "../components/discount/Discount"
import Shop from "../components/shops/Shop"
import Annocument from "../components/annocument/Annocument"
import Wrapper from "../components/wrapper/Wrapper"
import ShopHome from "../components/shops/ShopHome"
import TopSales from "../components/topsales/TopSales"
import CategorySlider from "../components/categoryslider/CategorySlider"

const Pages = ({ productItems, addToCart, CartItem, smartPhonesItem,laptopItems }) => {
  return (
    <>
      <Home CartItem={CartItem} />
      <FlashDeals productItems={productItems} addToCart={addToCart} />
      <TopCate />
      <NewArrivals />
      <Discount />
      <TopSales addToCart={addToCart} />
      <CategorySlider />
      <ShopHome
      shopItems={smartPhonesItem} 
      title={"Điện thoại"}
      />
      <ShopHome
      shopItems={laptopItems} 
      title={"Laptop"}
      />
      <Annocument />
      <Wrapper />
    </>
  )
}

export default memo(Pages)
