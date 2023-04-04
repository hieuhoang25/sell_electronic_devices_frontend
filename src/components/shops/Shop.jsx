import React, { memo } from 'react';
import Catg from './Catg';
import ShopCart from './ShopCart';
import './style.css';
import { Select, Space, Pagination } from 'antd';
import '../MainPage/Home.css';
import Home from '../MainPage/Home';

const Shop = ({
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
    isAuth,
}) => {
    const SortingCombox = () => {
        const handleChange = (value) => {
            console.log(`selected ${value}`);
        };
        return (
            <Space wrap>
                <Select
                    defaultValue="Bán chạy"
                    style={{
                        width: 150,
                    }}
                    onChange={handleChange}
                    options={[
                        {
                            value: 'Bán chạy',
                            label: 'Bán chạy',
                        },
                        {
                            value: 'price asc',
                            label: 'Giá cao đến thấp',
                        },
                        {
                            value: 'price desc',
                            label: 'Giá thấp đến cao',
                        },
                        {
                            value: 'discount',
                            label: 'Giảm giá',
                        },
                        {
                            value: 'discount',
                            label: 'Đánh giá',
                        },
                    ]}
                />
            </Space>
        );
    };

    return (
        <>
            <Home CartItem={sliderItem} />
            <section className="shop background">
                <div className="container d_flex">
                    <Catg
                        categories={categories}
                        onSelectCategory={onSelectCategory}
                        listBrand={listBrand}
                        listStorage={listStorage}
                        onChangeBrand={onChangeBrand}
                        onChangeStorage={onChangeStorage}
                        onClickResult={onClickResult}
                        key={categories.key}
                    />
                    <div className="contentWidth">
                        <div className="heading d_flex">
                            <div className="heading-left row  f_flex">
                                <h2>{title}</h2>
                            </div>
                            <SortingCombox />
                        </div>
                        <div className="product-content  grid1">
                            <ShopCart shopItems={shopItems} isAuth={isAuth} />
                        </div>
                        <Pagination
                            pageSize={1}
                            total={totalPage}
                            showQuickJumper
                            style={{ textAlign: 'center' }}
                            onChange={onChangePagination}
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default memo(Shop);
