import baseShirt from "../assets/images/shirt-base.png"
import Scotty1 from "../assets/images/scotty.png"
import Scotty2 from "../assets/images/scotty-2.png"
import Scotty3 from "../assets/images/scotty-3.png"
import Scotty4 from "../assets/images/scotty-4.png"
import Scotty5 from "../assets/images/scotty-5.png"
import SizeOptions from '../component/sizeOptions'
import { numberList } from '../shared/utils';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import SearchApi from "../api/unsplashApi"

export default function FromPictures({ addCart, user, onShirtImg, setOnShirtImg, query, setQuery, page, setPage, realData, setRealData }) {
    const [size, setSize] = useState("");
    const [qty, setQty] = useState("1");
    const [canGetMore, setCanGetMore] = useState(true);
    const defaultScottys = [Scotty1, Scotty2, Scotty3, Scotty4, Scotty5];
    const onClick = (e) => {
        // console.log(e.currentTarget.children[0].src);
        setOnShirtImg(e.currentTarget.children[0].src);
    }
    const searchImgs = async () => {
        const searchTerm = document.getElementById("search-bar").value;
        console.log(searchTerm);
        setQuery(searchTerm);
        setPage(1);
        const Data = await SearchApi(searchTerm, 1);
        if (Data.total_pages === 1) {
            setCanGetMore(false);
        }
        else {
            setCanGetMore(true);
        }
        setRealData(Data.results);
    }
    const getMoreImgs = async () => {
        const Data = await SearchApi(query, page + 1);
        if (Data.total_pages <= page + 1) {
            setCanGetMore(false);
        }
        else {
            setCanGetMore(true);
        }
        const oriData = JSON.parse(JSON.stringify(realData));

        setRealData([...oriData, ...Data.results]);
        setPage(page + 1);
    }
    useEffect(() => {
        console.log(realData);
        console.log(realData?.length);
        const elem = document.getElementById("search-result");
        elem.scrollTop = elem.scrollHeight;
    }, [realData]);
    return (
        <div className="create-from-pic-container">
            <div className="pic-shirt-container">

                <div className='detail-pic'>
                    <img src={baseShirt} className="shirt-pic" alt="shirt" />
                    {onShirtImg ? <img src={onShirtImg} className="on-shirt-pic" alt="pic-on-shirt" /> : null}
                </div>

                <div className="detail-text">
                    <p id="shirt-price">$20.00</p>
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
                            onClick={() => { addCart(-1, size, qty, { title: query, img: onShirtImg }); }} >
                            Add to Cart
                        </button>
                    </Link>
                </div>
            </div>
            <div className="search-pic-container">
                <div className="flex-center">
                    <input id="search-bar" type="search" defaultValue={query} />
                    <button onClick={searchImgs}>Search</button>
                </div>
                {realData && realData.length !== 0 ? null : <div id="no-search-results">No results. Maybe use a Scotty?</div>}
                <div id="search-result" className="search-result">
                    {realData && realData.length !== 0 ?
                        realData.map((data, idx) =>
                            <div key={data.id + idx} className="search-img-container" onClick={onClick}>
                                <img src={data.urls.small} className="search-pic" alt="default-scotty" />
                            </div>) :
                        defaultScottys.map(scotty =>
                            <div key={scotty} className="search-img-container" onClick={onClick}>
                                <img src={scotty} className="search-pic" alt="default-scotty" />
                            </div>)}
                </div>
                {realData && realData?.length !== 0 ?
                    <div className="flex-center">
                        <button type="button"
                            className="display-btn add-cart-btn"
                            disabled={!canGetMore}
                            onClick={getMoreImgs} >
                            Display more
                        </button>
                    </div> : null}

            </div>
        </div>
    )
}