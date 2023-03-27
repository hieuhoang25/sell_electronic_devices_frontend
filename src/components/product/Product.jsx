import Shop from '../shops/Shop';
import React, {
    memo,
    useState,
    useReducer,
    useEffect,
    useCallback,
    useRef,
} from 'react';
import axios from '../../services/axios';
import {
    FETCH_PRODUCTS_PENDING,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_ERROR,
    fetchProductsPending,
    fetchProductsSuccess,
    fetchProductsError,
} from '../../common/action/action';
// import "./components/axios/author"
import {
    BASE,
    PRODUCT,
    FILTER,
    CATEGORY,
    BRAND,
    STORAGE,
} from '../../constants/index';

const initialState = {
    pending: false,
    products: [],
    totalPage: 1,
    error: null,
};
const reducer = (state, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_PENDING:
            return {
                ...state,
                pending: true,
            };
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                pending: false,
                products: action.payload.data,
                size: action.payload.size,
                page: action.payload.page,
                totalPage: action.payload.totalPage,
            };
        case FETCH_PRODUCTS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error,
            };
        default:
            return state;
    }
};
function Product({ isAuth }) {
    const size = 10;
    const [category, setCategory] = useState([]);
    const [productsFilter, dispatch] = useReducer(reducer, initialState);
    const search = useRef([]);
    const [brand, setBrand] = useState([]);
    const [storage, setStorage] = useState([]);

    function fetchProductsByFilter(page = 0, search = []) {
        axios({
            method: 'post',
            url: `${BASE}${PRODUCT}${FILTER}`,
            data: search,
            params: { size: size, page: page },
        })
            .then((res) => {
                dispatch(fetchProductsSuccess(res.data));
                return res.data;
            })
            .catch((error) => dispatch(fetchProductsError(error)));
    }
    function fetchCategory() {
        axios({
            method: 'get',
            url: `${BASE}${CATEGORY}`,
        })
            .then((res) => {
                setCategory(() => res.data);
                return res.data;
            })
            .catch((error) => error);
    }
    //fetch category
    useEffect(() => {
        fetchCategory();
    }, []);

    //fetch all products
    useEffect(() => {
        fetchProductsByFilter();
    }, []);

    //fetch brand
    useEffect(() => {
        axios({
            method: 'get',
            url: `${BASE}${BRAND}`,
        })
            .then((res) => {
                setBrand(() => res.data);
                return res.data;
            })
            .catch((error) => error);
    }, []);

    //fetch storage
    useEffect(() => {
        axios({
            method: 'get',
            url: `${BASE}${STORAGE}`,
        })
            .then((res) => {
                setStorage(() => res.data);
                return res.data;
            })
            .catch((error) => error);
    }, []);

    //pagination
    const onChangePagination = useCallback((currentPage) => {
        fetchProductsByFilter(currentPage - 1, search.current);
    });
    //choose category
    const onSelectCategory = useCallback((selectedKeys, info) => {
        if (selectedKeys.length != 0) {
            //if search field is not exists, add a new one to array
            if (
                search.current.length == 0 ||
                search.current.some((item) => item.key === 'category') == false
            ) {
                search.current.push({
                    key: 'category',
                    value: selectedKeys[0],
                    operation: 'EQUAL',
                });
            } else {
                //if search field is exists we just need to set new value to it
                let index = search.current.findIndex(
                    (obj) => obj.key === 'category',
                );
                if (index != -1) search.current[index].value = selectedKeys[0];
            }
        } else {
            //delete search field if unselect
            search.current = search.current.filter(
                (element) => element.key !== 'category',
            );
        }
    });

    //choose brand
    const onChangeBrand = useCallback((checkedValues) => {
        if (search.current.some((item) => item.key === 'brand')) {
            search.current = search.current.filter(
                (element) => element.key !== 'brand',
            );
        }
        if (checkedValues.length != 0) {
            search.current.push({
                key: 'brand',
                value: checkedValues.toString(),
                operation: 'IN',
            });
        }

        console.log(search.current);
    });

    //choose storage
    const onChangeStorage = useCallback((checkedValues) => {});

    //search result
    const onClickResult = useCallback(() => {
        fetchProductsByFilter(0, search.current);
    });
    return (
        <>
            {productsFilter && (
                <Shop
                    shopItems={productsFilter.products}
                    categories={category}
                    onChangePagination={onChangePagination}
                    totalPage={productsFilter.totalPage}
                    onSelectCategory={onSelectCategory}
                    listBrand={brand}
                    listStorage={storage}
                    onChangeBrand={onChangeBrand}
                    onChangeStorage={onChangeStorage}
                    onClickResult={onClickResult}
                    isAuth={isAuth}
                />
            )}
        </>
    );
}

export default memo(Product);
