import React, { memo } from 'react';
import './Header.css';
import Search from './Search';
import Navbar from './Navbar';

const Header = ({ Cart }) => {
    return (
        <>
            <Search  />
            <Navbar />
        </>
    );
};

export default memo(Header);
