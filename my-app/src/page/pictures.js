import baseShirt from "../assets/images/shirt-base.png"
import Scotty from "../assets/images/scotty.png"
import SizeOptions from '../component/sizeOptions'
import {
    getShirtName, getPrice, noPriceString, numberList, getDescription,
    getFirstAvailableColorAndNum, setSelectedImage, getAllColors
} from '../shared/utils';
import { useState } from 'react';
import { Link } from "react-router-dom";

export default function FromPictures({ addCart, user }) {
    let [size, setSize] = useState("");
    let [qty, setQty] = useState("1");
    return (
        <div className="create-from-pic-container">
            <div className="pic-shirt-container">

                <div className='detail-pic'>
                    {/* {setSelectedImage(productID, color_detail, side_detail)} */}
                    <img src={baseShirt} className="shirt-pic" alt="shirt" />
                    <img src={Scotty} className="on-shirt-pic" alt="pic-on-shirt" />
                </div>

                <div className="detail-text">
                    <p id="shirt-price">$20</p>
                    {/* <p id="shirt-description">{getDescription(productID)}</p> */}


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
                            disabled={!user || size === "" ? true : false}
                            onClick={() => { addCart(size, qty); }} >
                            Add to Cart
                        </button>
                    </Link>
                </div>
            </div>
            <div className="search-pic-container">
                <div className="flex-center">
                    <input type="search" /><button>Search</button>
                </div>
            </div>
        </div>
    )
}