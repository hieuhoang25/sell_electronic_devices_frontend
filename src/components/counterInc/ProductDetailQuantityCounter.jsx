import { useState, Fragment, useEffect } from 'react';
import './style.css';
import { QTY_MAX, QTY_MIN } from '../../common/Cart/Cart';
function ProductDetailQuantityCounter({
    cartQty,
    cartQtyOnChangeHandler,
    setCartbuttonDisabled,
}) {
    // let [num, setNum] = useState(1);
    let incNum = () => {
        if (cartQty < QTY_MAX) {
            // console.log('pass value:', Number(cartQty) + 1);
            cartQtyOnChangeHandler(Number(cartQty) + 1);

            // setNum(Number(cartQty) + 1);
        }
        handleChange();
    };
    let decNum = () => {
        if (cartQty > QTY_MIN) {
            cartQtyOnChangeHandler(Number(cartQty) - 1);
        }
        handleChange();
    };
    useEffect(() => {
        handleChange();
    }, [cartQty]);

    const handleChange = () => {
        console.log('handle', cartQty);
        if (cartQty >= QTY_MAX || cartQty < QTY_MIN) {
            setCartbuttonDisabled((prev) => {
                return true;
            });
        } else {
            setCartbuttonDisabled((prev) => {
                return false;
            });
        }
    };

    /*
  
  <div class="qty-input">
	<button class="qty-count qty-count--minus" data-action="minus" type="button">-</button>
	<input class="product-qty" type="number" name="product-qty" min="0" max="10" value="1">
	<button class="qty-count qty-count--add" data-action="add" type="button">+</button>
</div>
  */
    return (
        <div className="counter-wrapper">
            <div class="counter-title">Chọn số lượng: </div>
            <div class="counter-input-wrapper">
                <div class="qty-input">
                    <button
                        class="qty-count qty-count--minus"
                        data-action="minus"
                        type="button"
                        onClick={decNum}
                        disabled={cartQty <= QTY_MIN}
                    >
                        -
                    </button>
                    <input
                        class="product-qty"
                        type="number"
                        name="product-qty"
                        value={cartQty}
                        onChange={handleChange}
                    />
                    <button
                        class="qty-count qty-count--add"
                        data-action="add"
                        type="button"
                        onClick={incNum}
                        disabled={cartQty >= QTY_MAX}
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
    // <Fragment>
    {
        /* <div className="counter-wrapper">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <button
                            class="btn btn-outline-primary"
                            type="button"
                            onClick={decNum}
                        >
                            -
                        </button>
                    </div>
                    <input
                        type="text"
                        class="form-control"
                        value={num}
                        onChange={handleChange}
                    />
                    <div class="input-group-prepend">
                        <button
                            class="btn btn-outline-primary"
                            type="button"
                            onClick={incNum}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div> */
    }

    {
        /* </Fragment> */
    }
}

export default ProductDetailQuantityCounter;
