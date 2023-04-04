import React, { memo } from 'react';
import logo from '../../components/assets/images/logo.svg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../services/axios';
import { useNavigate } from 'react-router-dom';
import { reset } from '../../redux/slices/CartSlice';

const Search = () => {
    // fixed Header
    window.addEventListener('scroll', function () {
        const search = document.querySelector('.search');
        search.classList.toggle('active', window.scrollY > 100);
    });
    const auth = useSelector((state) => state.auth);
    const Cart = useSelector((state) => state.cart);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        console.log('logout...');
        await axiosInstance
            .post(process.env.REACT_APP_URL + 'un/logout')
            .catch((error) => console.log(error));
       
            dispatch(reset());
        // window.localStorage.removeItem('cart');
        // dispatch(resetToGuestCart());
        // setInterval(() =>{
            window.location.reload('/');
        // },3000)
       
    };
    console.log('-------');
    console.log('inside Search called "Cart": ', Cart);
    return (
        <>
            <section className="search">
                <div className="container c_flex">
                    <div className="logo width ">
                        <img src={logo} alt="" />
                    </div>

                    <div className="search-box f_flex">
                        <i className="fa fa-search"></i>
                        <input
                            type="text"
                            placeholder="Search and hit enter..."
                        />
                        <span>All Category</span>
                    </div>

                    <div className="icon f_flex width">
                        <div className="cart popup-link" data-popup="Giỏ hàng">
                            <Link
                                // className="popup-link"
                                data-popup="Giỏ hàng"
                                to="/cart"
                            >
                                <i className="fa fa-shopping-bag icon-circle"></i>
                                <span>
                                    {Cart.totalCount === 0
                                        ? 0
                                        : Cart.totalCount}
                                </span>
                            </Link>
                        </div>
                        {auth.isAuthenticated ? (
                            <>
                                {' '}
                                <Link
                                    to="/profile"
                                    className="popup-link"
                                    data-popup="Tài khoản"
                                >
                                    <i className="fa fa-user icon-circle"></i>
                                </Link>
                                <Link
                                    className="popup-link"
                                    data-popup="Đăng xuất"
                                    onClick={handleLogout}
                                >
                                    <i className="fa fa-sign-out icon-circle"></i>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    className="popup-link"
                                    data-popup="Đăng nhập"
                                    to="/login"
                                >
                                    <i className="fa fa-sign-in icon-circle"></i>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default memo(Search);
