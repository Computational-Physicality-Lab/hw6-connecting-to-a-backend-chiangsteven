import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import SizeOptions from './sizeOptions'
import {
    getShirtName, getPrice, priceToNumber, getAllColors,
    setSelectedImage, numberList, priceSign
} from '../shared/utils';

export default function CartShirtItem({ shirt, idx, removeCartItem, changeQty, editCartItem }) {
    //let [qty, setQty] = useState(shirt.quantity);
    //console.log(`list id:${idx}, now content id is ${shirt.id}, color is ${shirt.color}, quantity is ${shirt.quantity}, size is ${shirt.size}`);
    //console.log(`list id:${idx}, now qty is ${qty}`);
    const colors = getAllColors(shirt.id);
    return (
        <div className="cart-item">
            <h3 >{getShirtName(shirt.id)}</h3>
            <div className="cart-item-except-name">
                <div className="cart-pic">
                    <Link to={`/details/${shirt.id}`}>
                        {setSelectedImage(shirt.id, shirt.color, 'front')}
                    </Link>
                </div>
                <div className="cart-item-text">
                    <div className="detail-selector-container">
                        <label htmlFor='quantity' >Quantity:</label>
                        <select value={shirt.quantity} id="quantity" className='color-btn'
                            onChange={(e) => {
                                changeQty(idx, e.target.value);
                                //setQty(e.target.value);
                            }}>
                            {numberList.map(quantity =>
                                <option key={quantity} value={quantity}>
                                    {quantity}
                                </option>
                            )}
                        </select>
                    </div>
                    <div className="detail-selector-container">Color:
                        <p className="cart-red-text">{`   ${shirt.color}`}</p>
                        <div className="cart-edit">
                            (Edit:
                            <select id="size" defaultValue={shirt.color} className='color-btn'
                                onChange={(e) => { editCartItem(idx, "color", e.target.value) }}>
                                {
                                    colors.map(color =>
                                        <option key={color} value={color} >
                                            {color}
                                        </option>
                                    )
                                }
                            </select>)
                        </div>
                    </div>
                    <div className="detail-selector-container">Size:
                        <p className="cart-red-text">{`   ${shirt.size}`}</p>
                        <div className="cart-edit">
                            (Edit:
                            <select id="size" defaultValue={shirt.size} className='color-btn'
                                onChange={(e) => { editCartItem(idx, "size", e.target.value) }}>
                                <SizeOptions />
                            </select>)
                        </div>
                    </div>
                    <div className="detail-selector-container">Price (each):
                        <p className="cart-red-text">{` ${getPrice(shirt.id)}`}</p>
                    </div>
                    <button className="cart-remove-btn"
                        onClick={() => { removeCartItem(idx); }}>
                        Remove
                    </button>
                </div >
            </div >
        </div >
    )
}