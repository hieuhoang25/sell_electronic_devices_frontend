import Header from "./common/header/Header"
import Footer from "./common/footer/Footer"
const Wrapper = ({children,cartItem}) =>{

    return (
        <>
        <Header CartItem={cartItem}/>
        {children}
        <Footer/>
        </>
    )
}

export default Wrapper