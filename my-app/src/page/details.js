import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import SizeOptions from '../component/sizeOptions'
import {
    getShirtName, getPrice, noPriceString, numberList, getDescription,
    getFirstAvailableColorAndNum, setSelectedImage, getAllColors
} from '../shared/utils';
import { useState } from 'react';

export default function Details({ addCart, user }) {
    let { productID } = useParams();
    let [side_detail, setSideDetail] = useState("front");
    const { firstColor } = getFirstAvailableColorAndNum(productID);
    let [color_detail, setColorDetail] = useState(firstColor);
    let [size, setSize] = useState("");
    let [qty, setQty] = useState("1");
    let noStock = (getPrice(productID) === noPriceString);

    const colors = getAllColors(productID);
    return (
        <>
            <h2 id="shirt-name">{getShirtName(productID)}</h2>
            <div className="detail-container">

                <div className='detail-pic'>
                    {setSelectedImage(productID, color_detail, side_detail)}
                </div>

                <div className="detail-text">
                    <p id="shirt-price">{getPrice(productID)}</p>
                    <p id="shirt-description">{getDescription(productID)}</p>
                    <div className="detail-selector-container">Side:
                        <button type="button" className="side-btn"
                            onClick={() => { setSideDetail("front"); }}>
                            front
                        </button>
                        <button type="button" className="side-btn"
                            onClick={() => { setSideDetail("back"); }}>
                            back
                        </button>
                    </div>
                    <div className="detail-selector-container">
                        Color:
                        <div id="shirt-color">
                            {
                                colors.map(option => {
                                    return (
                                        <button key={option} type="button" className=
                                            {(option === "white" || option === "yellow") ?
                                                "color-btn light-color" : "color-btn oth-color"}
                                            style={{ backgroundColor: option }}
                                            onClick={() => { setColorDetail(option); }} >
                                            {option}
                                        </button>)

                                })
                            }
                        </div>
                    </div>
                    <div className="detail-selector-container">
                        <label htmlFor='size'>Size:</label>
                        <select id="size" value={size} className='color-btn'
                            onChange={(e) => { setSize(e.target.value); }}>
                            <option value="">Size</option>
                            <SizeOptions />
                        </select>
                    </div>
                    <div className="detail-selector-container">
                        <label htmlFor='quantity' >Quantity:</label>
                        <select id="quantity" value={qty} className='color-btn'
                            onChange={(e) => { setQty(e.target.value); }}>
                            {
                                numberList.map(quantity =>
                                    <option key={quantity} value={quantity.toString()} >
                                        {quantity}
                                    </option>
                                )
                            }
                        </select>
                    </div>
                    <Link to='/shoppingcart'>
                        <button key="add-to-cart" type="button"
                            className="add-cart-btn"
                            disabled={!user || noStock || size === "" ? true : false}
                            onClick={() => { addCart(productID, size, qty, color_detail); }} >
                            Add to Cart
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
};