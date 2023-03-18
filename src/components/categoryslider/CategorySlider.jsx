import Slider from "react-slick"
import React,{memo} from "react"
import CatCard from "./CatCard"
import CatData from "./CatData";
import "./style.css";
const CategorySlider = () => {
    const {categories} = CatData;
    return (
        <>
          <section className='flash category-flash'>
            <div className='container'>
              <div className='heading f_flex'>
                <i className='fa fa-bolt'></i>
                <h1>Danh mục</h1>
              </div>
              <CatCard categories={categories} />
            </div>
          </section>
        </>
      )
}
export default memo(CategorySlider)