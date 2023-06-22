import { Link } from "react-router-dom";
import { getPrice, priceToNumber, priceSign } from '../shared/utils';
import CartShirtItem from "../component/cartShirtItem"
import { useEffect } from "react";

function calculateMyCart(myCart) {
    let total = 0;
    myCart.forEach((element) => {
        let s = (priceToNumber(getPrice(element.id)) * element.quantity).toPrecision(12);
        total = parseFloat((parseFloat(s) + total).toPrecision(12));
    });
    return total;
}

function calculateTotal(myCart, shippingFee) {
    return parseFloat((calculateMyCart(myCart) + shippingFee).toPrecision(12));
}

export default function Cart({ user, num, myCart, removeCartItem, changeQty, editCartItem, iniData }) {
    const shippingFee = 3.75;
    useEffect(() => {
        iniData();
    }, []);
    return (
        <>
            <h2 id="cart-name">My Cart ({num})</h2>
            <div className="cart-container">
                <div className="cart-list">
                    {
                        myCart.length === 0 ? <p id="cart-empty">Your Cart is Empty</p> :
                            myCart.map((shirt, idx) => (
                                <CartShirtItem key={shirt.timeStamp} shirt={shirt} idx={idx}
                                    removeCartItem={removeCartItem} changeQty={changeQty}
                                    editCartItem={editCartItem} />
                            ))
                    }
                </div >
                <div className="cart-checkout">
                    <h3 >Order Summery</h3>
                    <div className="sub-checkout">
                        <div className="amountbox">
                            <div className="amountbox-text">
                                <div>
                                    Subtotal:
                                    <br />
                                    Est. Shipping:
                                </div>
                                <p className="total-text">Total:</p>
                            </div>
                            <div className="amountbox-price">
                                <div>
                                    {`${priceSign}${calculateMyCart(myCart)}`}
                                    <br />
                                    {`${priceSign}${shippingFee}`}
                                </div>
                                <p className="total-text total-number">
                                    {`${priceSign}${calculateTotal(myCart, shippingFee)}`}
                                </p>
                            </div>
                        </div>
                        <div className="cart-checkout-btn-container">
                            <Link to={user ? "/not_implemented" : "/login"} className="cart-checkout-btn">
                                {user ? "Checkout" :
                                    "Login and Checkout"}
                            </Link>
                        </div>
                    </div>
                    <div className="cart-checkout-btn-container continue-div">
                        <Link to="/products" className="cart-checkout-btn">Continue Shopping</Link>
                    </div>
                </div>
            </div >
        </>
    )
};