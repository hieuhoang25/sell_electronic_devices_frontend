import Shop from "../shops/Shop";
import React, { memo } from "react";
function Product({
  shopItems,
  totalPage,
  onChangePagination,
  categories,
  title,
  sliderItem,
  onSelectCategory,
  onChangeBrand,
  onChangeStorage,
  listBrand,
  listStorage,
  onClickResult,
}) {
  return (
    <>
      <Shop
        shopItems={shopItems}
        totalPage={totalPage}
        onChangePagination={onChangePagination}
        categories={categories}
        title={title}
        sliderItem={sliderItem}
        onSelectCategory={onSelectCategory}
        onChangeBrand={onChangeBrand}
        onChangeStorage = {onChangeStorage}
        listBrand = {listBrand}
        listStorage = {listStorage}
        onClickResult = {onClickResult}
      />
    </>
  );
}

export default memo(Product);
