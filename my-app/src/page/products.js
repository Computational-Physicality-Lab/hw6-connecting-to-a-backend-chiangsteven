import shirts from '../shared/shirts';
import { Link } from "react-router-dom";
import { getShirtName, getFirstAvailableColorAndNum, getFirstShirtImages } from '../shared/utils';

function createShirtItem(idx, name, pic, num) {
    return (

        <div key={idx} className="shirt-item">
            <Link to={"/details/" + idx}>
                <img src={pic} alt='t-shirt pic' />
            </Link>
            <p>{name}</p>
            <p className="ava-color">Available in {num} colors</p>
            <Link to={"/details/" + idx} className="side-btn">See more</Link>
        </div>

    );
}

function products() {
    return (
        <>
            <h2 className="title">Our T-Shirts</h2>
            <div id="shirts-list">
                {shirts.map((_, idx) => {
                    const { firstColor, numColors } = getFirstAvailableColorAndNum(idx);
                    const name = getShirtName(idx);
                    const { front_image } = getFirstShirtImages(idx, firstColor);
                    return createShirtItem(idx, name, front_image, numColors);
                })}
            </div>
        </>
    );
}

export default products;