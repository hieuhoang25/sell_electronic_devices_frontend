import React, {
  useState,
  useReducer,
  useEffect,
  useCallback,
  useRef,
} from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Pages from "./pages/Pages";
import Data from "./components/Data";
import Cart from "./common/Cart/Cart";
import Sdata from "./components/shops/Sdata";
import ProductDetail from "./components/productDetail/ProductDetail";
import Profile from "./components/userProfile/Profile";
import Wrapper from "./Wrapper";
import LoginPage from "./components/LoginPage/LoginPage";
import SignUp from "./components/SignUpPage/SignUp";
import axios from "axios";
import Checkout from "./components/checkout/Checkout";
import {
  FETCH_PRODUCTS_PENDING,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  fetchProductsPending,
  fetchProductsSuccess,
  fetchProductsError,
} from "./common/action/action";
// import "./components/axios/author"
import { BASE, PRODUCT, FILTER, CATEGORY, BRAND, STORAGE } from "./constants";
import Product from "./components/product/Product";
import { Search } from "semantic-ui-react";
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

function App() {
  const size = 10;
  const [smartphones, setSmartPhones] = useState([]);
  const [laptop, setLaptop] = useState([]);
  const [category, setCategory] = useState([]);
  const [productsFilter, dispatch] = useReducer(reducer, initialState);
  const search = useRef([
    {
      key: "brand",
      value: 1,
      operation: "EQUAL",
    },
  ]);
  const [brand, setBrand] = useState([]);
  const [storage, setStorage] = useState([]);
  const brandSelected = useRef([]);
  const storageSelected = useRef([]);
  function fetchProductsByFilter(page = 0, search = []) {
    axios({
      method: "post",
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
      method: "get",
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

  //fetch smartPhones
  useEffect(() => {
    axios({
      method: "post",
      url: `${BASE}${PRODUCT}${FILTER}`,
      data: [
        {
          key: "category",
          value: 1,
          operation: "EQUAL",
        },
      ],
      params: { size: size, page: 0 },
    })
      .then((res) => {
        setSmartPhones(() => res.data.data);
        return res.data;
      })
      .catch((error) => error);
  }, []);
  //fetch laptop
  useEffect(() => {
    axios({
      method: "post",
      url: `${BASE}${PRODUCT}${FILTER}`,
      data: [
        {
          key: "category",
          value: 2,
          operation: "EQUAL",
        },
      ],
      params: { size: size, page: 0 },
    })
      .then((res) => {
        setLaptop(() => res.data.data);
        return res.data;
      })
      .catch((error) => error);
  }, []);

  //fetch brand
  useEffect(() => {
    axios({
      method: "get",
      url: `${BASE}${BRAND}`,
    })
      .then((res) => {
        console.log(res.data);
        setBrand(() => res.data);
        return res.data;
      })
      .catch((error) => error);
  }, []);

  //fetch storage
  useEffect(() => {
    axios({
      method: "get",
      url: `${BASE}${STORAGE}`,
    })
      .then((res) => {
        console.log(res.data);
        setStorage(() => res.data);
        return res.data;
      })
      .catch((error) => error);
  }, []);

  //pagination
  const onChangePagination = (currentPage, PageSize) => {
    fetchProductsByFilter(currentPage - 1, search.current);
  };
  //choose category
  const onSelectCategory = useCallback((selectedKeys, info) => {
    if (selectedKeys.length != 0) {
      //if search field is not exists, add a new one to array
      if (
        search.current.length == 0 ||
        search.current.some((item) => item.key === "category") == false
      ) {
        search.current.push({
          key: "category",
          value: selectedKeys[0],
          operation: "EQUAL",
        });
      } else {
        //if search field is exists we just need to set new value to it
        let index = search.current.findIndex((obj) => obj.key === "category");
        if (index != -1) search.current[index].value = selectedKeys[0];
      }
    } else {
      //delete search field if unselect
      search.current = search.current.filter(
        (element) => element.key !== "category"
      );
    }
  });

  //choose brand
  const onChangeBrand = useCallback((checkedValues) => {
    // if (search.current.some((item) => item.key === "brand")) {
    //   search.current = search.current.filter(
    //     (element) => element.key !== "brand"
    //   );
    // }
    // checkedValues.forEach((item) => {
    //   search.current.push({
    //     key: "brand",
    //     value: item,
    //     operation: "EQUAL",
    //   });
    // });
    // console.log(search.current)
  });

  //choose storage
  const onChangeStorage = useCallback((checkedValues) => {});

  //search result
  const onClickResult = useCallback(() => {
    fetchProductsByFilter(0, search.current);
  });
  /*
  step1 :  const { productItems } = Data 
  lai pass garne using props
  
  Step 2 : item lai cart ma halne using useState
  ==> CartItem lai pass garre using props from  <Cart CartItem={CartItem} /> ani import garrxa in cartItem ma
 
  Step 3 :  chai flashCard ma xa button ma

  Step 4 :  addToCart lai chai pass garne using props in pages and cart components
  */

  //Step 1 :

  const { productItems } = Data;
  const { shopItems } = Sdata;

  //Step 2 :
  const [CartItem, setCartItem] = useState([]);

  //Step 4 :
  const addToCart = (product) => {
    // if hamro product alredy cart xa bhane  find garna help garxa
    const productExit = CartItem.find((item) => item.id === product.id);
    // if productExit chai alredy exit in cart then will run fun() => setCartItem
    // ani inside => setCartItem will run => map() ani yo map() chai each cart ma
    // gayara check garxa if item.id ra product.id chai match bhayo bhane
    // productExit product chai display garxa
    // ani increase  exits product QTY by 1
    // if item and product doesnt match then will add new items
    if (productExit) {
      setCartItem(
        CartItem.map((item) =>
          item.id === product.id
            ? { ...productExit, qty: productExit.qty + 1 }
            : item
        )
      );
    } else {
      // but if the product doesnt exit in the cart that mean if card is empty
      // then new product is added in cart  and its qty is initalize to 1
      setCartItem([...CartItem, { ...product, qty: 1 }]);
    }
  };

  // Stpe: 6
  const decreaseQty = (product) => {
    // if hamro product alredy cart xa bhane  find garna help garxa
    const productExit = CartItem.find((item) => item.id === product.id);

    // if product is exit and its qty is 1 then we will run a fun  setCartItem
    // inside  setCartItem we will run filter to check if item.id is match to product.id
    // if the item.id is doesnt match to product.id then that items are display in cart
    // else
    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.id !== product.id));
    } else {
      // if product is exit and qty  of that produt is not equal to 1
      // then will run function call setCartItem
      // inside setCartItem we will run map method
      // this map() will check if item.id match to produt.id  then we have to desc the qty of product by 1
      setCartItem(
        CartItem.map((item) =>
          item.id === product.id
            ? { ...productExit, qty: productExit.qty - 1 }
            : item
        )
      );
    }
  };

  return (
    <>
      <Router>
        <Switch>
          <Wrapper cartItem={0}>
            <Route path="/" exact>
              <Pages
                productItems={productItems}
                addToCart={addToCart}
                shopItems={productItems}
                smartPhonesItem={smartphones}
                laptopItems={laptop}
              />
            </Route>
            <Route path="/product/:categoryId" exact>
              <Product
                shopItems={productsFilter.products}
                sliderItem={productItems}
                categories={category}
                onChangePagination={onChangePagination}
                totalPage={productsFilter.totalPage}
                onSelectCategory={onSelectCategory}
                listBrand={brand}
                listStorage={storage}
                onChangeBrand={onChangeBrand}
                onChangeStorage={onChangeStorage}
                onClickResult={onClickResult}
              />
            </Route>
            <Route path="/cart" exact>
              <Cart
                CartItem={CartItem}
                addToCart={addToCart}
                decreaseQty={decreaseQty}
              />
            </Route>
            <Route path="/product-detail/:productId" exact>
              <ProductDetail />
            </Route>
            <Route path="/profile" exact>
              <Profile />
            </Route>
            <Route path="/checkout" exact>
              <Checkout CartItem={CartItem} />
            </Route>
          </Wrapper>
        </Switch>
      </Router>
    </>
  );
}

export default App;
