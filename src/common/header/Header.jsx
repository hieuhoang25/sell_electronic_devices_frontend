import React, { memo } from 'react';
import './Header.css';
import Search from './Search';
import Navbar from './Navbar';

const Header = ({ Cart }) => {
    return (
        <>
            <Search Cart={Cart} />

            <Navbar />
        </>
    );
};

export default memo(Header);
