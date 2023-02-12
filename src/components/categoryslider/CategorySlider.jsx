import Slider from "react-slick"

import CatCard from "./CatCard"
import CatData from "./CatData";
import "./style.css";
const CategorySlider = () => {

    const {categories} = CatData;

    console.log(categories);
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
export default CategorySlider