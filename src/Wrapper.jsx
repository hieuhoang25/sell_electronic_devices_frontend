import Header from './common/header/Header';
import Footer from './common/footer/Footer';
import { useLocation } from "react-router-dom";
import {useLayoutEffect} from 'react'
const Wrapper = ({ children, Cart }) => {
    return (
        <>
            <Header  />
            {children}
            <Footer />
        </>
    );
};

export default Wrapper;
