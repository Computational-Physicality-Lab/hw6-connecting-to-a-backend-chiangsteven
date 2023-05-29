import { Link, Navigate } from "react-router-dom";
import {
    getShirtName, getPrice, priceToNumber, getAllColors,
    setSelectedImage, numberList, priceSign
} from './shared/utils';
import CartShirtItem from "./cartShirtItem"
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
        if (user) {
            iniData();
            // setTimeout(() => {
            //     iniData();
            // }, 1000);

        }
    }, []);
    return (
        <>
            {!user && <Navigate to="/login" />}
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
                            <Link to="/not_implemented" className="cart-checkout-btn">Sing in and Checkout</Link>
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

// function CartShirtItem({ shirt, idx, removeCartItem, changeQty, editCartItem }) {
//     let [qty, setQty] = useState(shirt.quantity);
//     //console.log(`list id:${idx}, now content id is ${shirt.id}, color is ${shirt.color}, quantity is ${shirt.quantity}, size is ${shirt.size}`);
//     //console.log(`list id:${idx}, now qty is ${qty}`);
//     const colors = getAllColors(shirt.id);
//     useEffect(() => { console.log(qty) }, [qty]);
//     return (
//         <div className="cart-item">
//             <h3 >{getShirtName(shirt.id)}</h3>
//             <div className="cart-item-except-name">
//                 <div className="cart-pic">
//                     <Link to={`/details/${shirt.id}`}>
//                         {setSelectedImage(shirt.id, shirt.color, 'front')}
//                     </Link>
//                 </div>
//                 <div className="cart-item-text">
//                     <div className="detail-selector-container">
//                         <label htmlFor='quantity' >Quantity:</label>
//                         <select value={qty} id="quantity" className='color-btn'
//                             onChange={(e) => {
//                                 changeQty(idx, e.target.value);
//                                 setQty(e.target.value);
//                             }}>
//                             {numberList.map(quantity =>
//                                 <option key={quantity} value={quantity.toString()}>
//                                     {quantity}
//                                 </option>
//                             )}
//                         </select>
//                     </div>
//                     <div className="detail-selector-container">Color:
//                         <p className="cart-red-text">{`   ${shirt.color}`}</p>
//                         <div className="cart-edit">
//                             (Edit:
//                             <select id="size" defaultValue={shirt.color} className='color-btn'
//                                 onChange={(e) => { editCartItem(idx, "color", e.target.value) }}>
//                                 {
//                                     colors.map(color =>
//                                         <option key={color} value={color} >
//                                             {color}
//                                         </option>
//                                     )
//                                 }
//                             </select>)
//                         </div>
//                     </div>
//                     <div className="detail-selector-container">Size:
//                         <p className="cart-red-text">{`   ${shirt.size}`}</p>
//                         <div className="cart-edit">
//                             (Edit:
//                             <select id="size" defaultValue={shirt.size} className='color-btn'
//                                 onChange={(e) => { editCartItem(idx, "size", e.target.value) }}>
//                                 <SizeOptions />
//                             </select>)
//                         </div>
//                     </div>
//                     <div className="detail-selector-container">Price (each):
//                         <p className="cart-red-text">{` ${getPrice(shirt.id)}`}</p>
//                     </div>
//                     <button className="cart-remove-btn"
//                         onClick={() => { removeCartItem(idx); }}>
//                         Remove
//                     </button>
//                 </div >
//             </div >
//         </div >
//     )
// }