import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    // Toogle Menu
    const [MobileMenu, setMobileMenu] = useState(false);
    return (
        <>
            <header className="header">
                <div className="container d_flex">
                    <div className="navlink">
                        <ul
                            className={
                                MobileMenu
                                    ? 'nav-links-MobileMenu'
                                    : 'link f_flex capitalize'
                            }
                            onClick={() => setMobileMenu(false)}
                        >
                            {/*<ul className='link f_flex uppercase {MobileMenu ? "nav-links-MobileMenu" : "nav-links"} onClick={() => setMobileMenu(false)}'>*/}
                            <li>
                                <Link to="/">Trang chủ</Link>
                            </li>
                            <li>
                                <Link to="/product">Sản phẩm</Link>
                            </li>
                            <li>
                                <Link to="/contact">Liên hệ</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Navbar;
