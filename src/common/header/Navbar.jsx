import React, { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import './Header.css';
import CategoriesDropDown from './CategoriesDropDown';

const Navbar = () => {
    // Toogle Menu
    const [MobileMenu, setMobileMenu] = useState(false);

    return (
        <React.Fragment>
            <header className="header">
                <div className="container d_flex">
                    <div className="navlink header-action">
                        <ul
                            className={`${
                                MobileMenu
                                    ? 'nav-links-MobileMenu'
                                    : 'link f_flex capitalize'
                            } header-action-btn`}
                            onClick={() => setMobileMenu(false)}
                        >
                            <li>
                                <CategoriesDropDown></CategoriesDropDown>
                            </li>
                            <li>
                                <Link to="/">Trang chủ</Link>
                            </li>
                            <li>
                                <Link
                                    to="/product#section-product"
                                    scroll={(element) =>
                                        element.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'end',
                                            inline: 'nearest',
                                        })
                                    }
                                >
                                    Sản phẩm
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact">
                                    Liên hệ
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        </React.Fragment>
    );
};

export default Navbar;
