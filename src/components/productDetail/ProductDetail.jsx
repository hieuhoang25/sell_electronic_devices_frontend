import { React, useState, memo, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Card, Button, Checkbox, Space, Radio, Form } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import HalfRatingRead from '../../common/rating/HalfRatingRead';
import CustomizedNotification from '../../common/notification/Notification';
import ListSpecification from './ListSpecification';
import TabReviewAndDescription from './TabReviewAndDescription';
import RatingForm from '../../common/rating/RatingForm';
import { useParams } from 'react-router-dom';
import axios from '../../services/axios';
import ProductDetailQuantityCounter from '../counterInc/ProductDetailQuantityCounter';
import CartNotification from '../../common/notification/CartNotification';
import CartNotification_TYPE from '../../common/notification/CartNotification';
import { addItemToCart,updateCart } from '../../services/cartService.js';
import scrollIntoView from 'scroll-into-view-if-needed'
import {
    QTY_MAX,
    QTY_MIN,
    getCartDetailRequest,
    CartRequestTYPE,
} from '../../common/Cart/Cart';

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
    PRODUCT_COLOR,
    PRODUCT_DETAIL,
    PRODUCT_STORAGE,
} from '../../constants/index';
import { getImage } from '../../common/img';
import { NumericFormat } from 'react-number-format';
import { USER, WISHLISTS } from '../../constants/user';
import { useNavigate } from 'react-router-dom';

const ProductDetail = ({ isAuth }) => {



    let navigate = useNavigate();
    const dispatch = useDispatch();
    const Cart = useSelector((state) => state.cart);
    const { productId } = useParams();
    const [color, setColor] = useState([]);
    const [storage, setStorage] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [productDetail, setProductDetail] = useState({});
    const [selectedStorage, setSelectedStorage] = useState();
    const [selectedColor, setSelectedColor] = useState();
    const [cartQty, setCartQty] = useState(1);
    const [cartButtonDisabled, setCartbuttonDisabled] = useState(false);
    const myRef = useRef(null);
    


    const [cartAddedNotif, setCartAddedNotif] = useState({
        title: 'Thêm vào giỏ hàng',
        message: '',
        type: CartNotification_TYPE.SUCCESS,
        content: null,
        isSuccess: null,
    });
    const productBody = useRef({
        productId: productId,
        colorId: null,
        storageId: null,
    });
    const specificationTable = useRef([]);
    console.log(productId);
    function fetchColor(id) {
        console.log('fetchColor: ', id);
        return axios({
            method: 'get',
            url: `${BASE}${PRODUCT_COLOR}/${id}`,
        })
            .then((res) => {
                productBody.current.colorId = res.data[0].id;
                setColor(res.data);
                setSelectedColor(res.data[0].id);
            })
            .catch((error) => error);
    }

    function fetchStorage(productId, colorId) {
        return axios({
            method: 'get',
            url: `${BASE}${PRODUCT_STORAGE}/${productId}/${colorId}`,
        })
            .then((res) => {
                productBody.current.storageId = res.data[0].id;
                setSelectedStorage(res.data[0].id);
                setStorage(res.data);
            })
            .catch((error) => error);
    }

    function fetchProductDetail() {
        console.log('productBody.current', productBody.current);
        return axios({
            method: 'post',
            url: `${BASE}${PRODUCT_DETAIL}`,
            data: productBody.current,
        })
            .then((res) => {
                console.log('product-detail: ', res.data);
                setProductDetail(res.data);
                specificationTable.current = res.data.product_productAttributes;
                setCartQty(1);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }

    async function getProductDetail() {
        await fetchColor(productId);
        await fetchStorage(productId, productBody.current.colorId);
        await fetchProductDetail();
    }

    useEffect(() => {
        getProductDetail();
        executeScroll();
    }, []);

    const executeScroll = () => {
        scrollIntoView(myRef.current, { behavior: 'smooth'})
     }
    //Mở form đánh giá
    const [isModalOpen, setIsModalOpen] = useState(false);
    const rate = () => {
        setIsModalOpen(true);
    };
    const handleFinish = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if(Cart.isAnonymous) {
            console.log('updateCart()');
            dispatch(updateCart());
        }
    },[Cart])
    //End
    const handleAddToCart = async (callback) => {
        const mess_message = productDetail.display_name;

        const mess_title = 'Thêm vào giỏ hàng';
        console.log('handlemessage', mess_message);
        console.log('title:', cartAddedNotif.title);
        console.log('cart: ', Cart);

        const item_id = productDetail.id;
        console.log('item_id: ', item_id);
        const { items } = Cart;

        console.log("%cITEMS: ", "color:red",items,);

        const request = {
            cart_id: Cart.id,
            id: item_id,
            product_variant_id: item_id,
            quantity: cartQty,
        };
        // console.log('items: ', items);
        let cartIndex = items.findIndex((item) => item.productVariant.id === item_id);
        // console.log('cartIndex', cartIndex);
        // console.log('san pham trong gio? ', cartIndex);
        // sản phẩm có trong giỏ
        if (cartIndex >= 0) {
            // console.log(' items[cartIndex]: ', items[cartIndex]);
            const { quantity: c_qty } = items[cartIndex];
            console.log('current quty; ', c_qty);
            if (c_qty >= QTY_MAX) {
                console.log('failed');
                setCartAddedNotif((prev) => {
                    return {
                        ...prev,
                        message: `Số lượng sản phẩm trong giỏ không quá ${QTY_MAX} sản phẩm`,
                        title: 'Không thể thêm vào giỏ',
                        isSuccess: false,
                    };
                });
            } else {
                const currentItem = items.find;
                let fixedQty =
                    c_qty + cartQty > QTY_MAX ? QTY_MAX - c_qty : cartQty;
                // const request = {
                //     cart_id: Cart.id,
                //     id: item_id,
                //     quantity: fixedQty,
                // };

                const requestItem = getCartDetailRequest(
                    { ...request, quantity: fixedQty },
                    CartRequestTYPE.ADD,
                );
                console.log(' requestItem', requestItem);
                setCartAddedNotif((prev) => {
                    return {
                        ...prev,
                        message: mess_message,
                        title: mess_title,
                        isSuccess: true,
                    };
                });
                dispatch(addItemToCart(requestItem));
            }
        } else {
            const requestItem = getCartDetailRequest(
                request,
                CartRequestTYPE.ADD,
            );
            console.log(' requestItem', requestItem);
            dispatch(addItemToCart(requestItem));
            setCartAddedNotif((prev) => {
                return {
                    ...prev,
                    message: mess_message,
                    title: mess_title,
                    isSuccess: true,
                };
            });
        }

        // console.log('Đã thêm vào giỏ');
        // console.log('Qty: ', cartQty);
    };

    const setSuccessNull = () => {
        setCartAddedNotif((prev) => {
            return {
                ...prev,

                isSuccess: null,
            };
        });
    };

    // useEffect(() => {
    //     return () => {
    //         console.log('clean up');
    //         if (cartAddedNotif.isSuccess != null) {
    //             console.log('clean up - set null');
    //             setCartAddedNotif((prev) => {
    //                 return {
    //                     ...prev,
    //                     isSuccess: null,
    //                 };
    //             });
    //         }
    //     };
    // }, [cartAddedNotif]);

    function fetchIsWishlist(productId) {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_URL}${USER}${WISHLISTS}/${productId}`,
        })
            .then((res) => {
                console.log(res.data);
                setFavorite(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    //fetch wishlist
    useEffect(() => {
        if (isAuth) {
            fetchIsWishlist(productId);
        }
    }, [isAuth]);
    //add wishlist
    function addWishlists(product_id) {
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_URL}${USER}${WISHLISTS}`,
            data: [{ product_id: product_id }],
        }).catch((error) => {
            console.log(error);
        });
    }
    //remove wishlist
    function removeWishlists(product_id) {
        axios({
            method: 'delete',
            url: `${process.env.REACT_APP_URL}${USER}${WISHLISTS}`,
            data: [{ product_id: product_id }],
        }).catch((error) => {
            console.log(error);
        });
    }

    const [isFavorite, setFavorite] = useState(false);
    //handleWishlist
    const handleFavoriteClick = () => {
        if (isAuth) {
            if (isFavorite) {
                removeWishlists(productId);
                setFavorite(false);
            } else {
                addWishlists(productId);
                setFavorite(true);
            }
        } else return navigate('/login');
    };
    //fetch detail product
    async function fetchProductDetailByColor(color) {
        // await fetchStorage(productId, color);
        await fetchProductDetail();
    }
    const onChangeColor = useCallback(({ target: { value } }) => {
        console.log('color-value', value);
        setSelectedColor((prev) => {
            return value;
        });
        productBody.current.colorId = value;
        console.log('selectedColor id: ', selectedColor);
        // fetchProductDetailByColor(value);
    });

    useEffect(() => {
        // fetch sau khi select = setSelected khong cap nhap ngay
        fetchProductDetail();
    }, [selectedColor, selectedStorage]);

    const handleStorageChange = useCallback(({ target: { value } }) => {
        setSelectedStorage(value);
        productBody.current.storageId = value;
    });

    // cartQtyHandler
    const cartQtyOnChangeHandler = (value) => {
        console.log('change quantity to: ', value);
        setCartQty((prev) => {
            return value;
        });
    };

    return (
        <div id="top-product-page" ref={myRef} style={{ marginTop: '5rem', marginBottom: '5rem', scrollMarginBotom: '8vh' }}>
            <Row >
                <Col span={15} offset={6}>
                    <div
                        style={{
                            display: 'flex',
                            p: 1,
                            padding: '0px',
                            flexDirection: {
                                xs: 'column', // mobile
                                sm: 'row', // tablet and up
                            },
                        }}
                    >
                        <div
                            style={{
                                position: 'relative',
                                display: 'inline-block',
                            }}
                        >
                            <img
                                width="300"
                                height="300"
                                alt="example"
                                src={getImage(productDetail.image)}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    zIndex: 2,
                                    borderRadius: '50%',
                                    right: '20rem',
                                    top: 0,
                                    transform: 'translateY(50%)',
                                }}
                            >
                                <Button
                                    onClick={handleFavoriteClick}
                                    shape="circle"
                                    icon={
                                        isFavorite ? (
                                            <HeartFilled
                                                style={{ color: 'red' }}
                                            />
                                        ) : (
                                            <HeartOutlined />
                                        )
                                    }
                                />
                            </div>
                        </div>

                        <div style={{ marginLeft: 2 }}>
                            {/*Ten va so sao san pham*/}
                            <div>
                                {productDetail.display_name}
                                <HalfRatingRead
                                    value={productDetail.product_averagePoint}
                                />
                            </div>
                            {/*Gia san pham*/}
                            <div>
                                <span
                                    style={{ color: 'red', marginRight: '5px' }}
                                >
                                    <NumericFormat
                                        value={productDetail.price}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'đ'}
                                    />
                                </span>
                                <span
                                    style={{ textDecoration: 'line-through' }}
                                >
                                    30.990.000 ₫
                                </span>
                            </div>
                            {/*Phần ram và dung lượng*/}
                            <Form name="validate_other">
                                <Form.Item
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please pick an item!',
                                        },
                                    ]}
                                >
                                    <Radio.Group
                                        onChange={handleStorageChange}
                                        value={selectedStorage}
                                    >
                                        <Space
                                            wrap
                                            size={[5, 12]}
                                            style={{ width: '400px' }}
                                        >
                                            {storage.map((item) => (
                                                <Radio.Button
                                                    key={item.id}
                                                    value={item.id}
                                                >
                                                    <div
                                                        style={{
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        <div>
                                                            {item.storage_name}
                                                        </div>
                                                    </div>
                                                </Radio.Button>
                                            ))}
                                        </Space>
                                    </Radio.Group>
                                    {/*Phần màu sản phẩm nếu có*/}
                                </Form.Item>
                            </Form>
                            <Form name="validate_other">
                                <Form.Item
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please pick an item!',
                                        },
                                    ]}
                                >
                                    <Radio.Group
                                        onChange={onChangeColor}
                                        value={selectedColor}
                                    >
                                        <Space
                                            wrap
                                            size={[1, 1]}
                                            style={{ width: '400px' }}
                                        >
                                            <div style={{ padding: '1px' }}>
                                                Chọn màu để xem giá
                                            </div>
                                            <Space
                                                wrap
                                                size={[5, 12]}
                                                style={{ width: '400px' }}
                                            >
                                                {color.map((item) => (
                                                    <Radio.Button
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        <div
                                                            style={{
                                                                textAlign:
                                                                    'center',
                                                            }}
                                                        >
                                                            <div>
                                                                {
                                                                    item.color_name
                                                                }
                                                            </div>
                                                        </div>
                                                    </Radio.Button>
                                                ))}
                                            </Space>
                                        </Space>
                                    </Radio.Group>
                                </Form.Item>
                            </Form>
                            {/* Counter cho so luong */}

                            <ProductDetailQuantityCounter
                                cartQty={cartQty}
                                cartQtyOnChangeHandler={cartQtyOnChangeHandler}
                                // setCartbuttonDisabled={setCartbuttonDisabled}
                            ></ProductDetailQuantityCounter>

                            {/*Them vaoo gio*/}
                            <div style={{ padding: '5px' }}>
                                <CartNotification
                                    key={cartAddedNotif}
                                    isButtonDisabled={cartButtonDisabled}
                                    title={cartAddedNotif.title}
                                    type={cartAddedNotif.type}
                                    message={cartAddedNotif.message}
                                    handleClick={handleAddToCart}
                                    isSuccess={cartAddedNotif.isSuccess}
                                    setSuccessNull={setSuccessNull}
                                ></CartNotification>
                                {/* <CustomizedNotification
                                    buttonContent="Thêm vào giỏ"
                                    handleClick={handleAddToCart}
                                    type="success"
                                    placement="bottomRight"
                                    message="Đã thêm vào giỏ"
                                    style={{ width: '90%' }}
                                /> */}
                            </div>
                        </div>
                        {/*Thông số kỹ thuật*/}
                        <div style={{ width: '100%' }}>
                            {specificationTable.current && (
                                <ListSpecification
                                    data={specificationTable.current}
                                />
                            )}
                        </div>
                        {/*Đánh giá và mô tả*/}
                    </div>
                    <TabReviewAndDescription
                        handleClick={rate}
                        listReview={productDetail.rating}
                        description={
                            productDetail.product_description
                                ? productDetail.product_description
                                : 'chưa có mô tả'
                        }
                        loading={isLoading}
                    />
                </Col>
            </Row>
        </div>
    );
};
export default memo(ProductDetail);
