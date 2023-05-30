import shirts from './shirts';
import defaultFrontShirt from "../assets/shirt_images/default-m-front.png";
import defaultBackShirt from "../assets/shirt_images/default-m-back.png";
import baseShirt from "../assets/images/shirt-base.png"

const noPriceString = "No price info";

function getShirtName(idx) {
    let name = shirts[idx].name;
    if (name === undefined)
        name = "Unamed shirt";
    return name;
}

function getPrice(idx) {
    if (idx === -1)
        return "$20.00";
    let price = shirts[idx].price;
    if (price === undefined)
        price = noPriceString;
    return price;
}

function getDescription(idx) {
    let description = shirts[idx].description;
    if (description === undefined)
        description = "No description";
    return description;
}

function getAllColors(idx) {
    let colors = [];
    for (let color in shirts[idx].colors) {
        colors.push(color);
    }
    return colors;
}

function getFirstAvailableColorAndNum(idx) {
    let firstColor = undefined;
    let numColors = 0;
    for (let color in shirts[idx].colors) {
        numColors++;
        if (firstColor === undefined || shirts[idx].colors[firstColor].front === undefined)
            firstColor = color;
    }
    return { "firstColor": firstColor, "numColors": numColors };
}

function getFirstShirtImages(idx, firstColor) {
    let front_image = undefined;
    let back_image = undefined;
    if (firstColor === undefined || shirts[idx].colors === undefined || shirts[idx].colors[firstColor].front === undefined)
        front_image = defaultFrontShirt;
    else
        front_image = shirts[idx].colors[firstColor].front;
    if (firstColor === undefined || shirts[idx].colors === undefined || shirts[idx].colors[firstColor].back === undefined)
        back_image = defaultBackShirt;
    else
        back_image = shirts[idx].colors[firstColor].back;
    return { "front_image": front_image, "back_image": back_image };
}

function setSelectedImage(idx, color_detail, side_detail) {
    let image;
    if (shirts[idx].colors === undefined)
        return (<img id="shirt-pic" src={defaultFrontShirt} alt="shirt" />);;
    if (shirts[idx].colors[color_detail][side_detail] === undefined && side_detail === "front")
        image = defaultFrontShirt;
    else if (shirts[idx].colors[color_detail][side_detail] === undefined && side_detail === "back")
        image = defaultBackShirt;
    else
        image = shirts[idx].colors[color_detail][side_detail];
    return (<img className="shirt-pic" src={image} alt="shirt" />);

}

function setCustomShirtImage(imgUrl) {
    return (<div className='detail-pic'><img src={baseShirt} className="shirt-pic" alt="shirt" />
        {imgUrl ? <img src={imgUrl} className="on-shirt-pic" alt="pic-on-shirt" /> : null}
    </div>)
}

const numberList = [];
for (let i = 1; i <= 20; i++) {
    numberList.push(i);
}

const priceSign = "$";
const CollectionName = "shoppingCart";

function priceToNumber(price) {
    return parseFloat(price.replace(priceSign, ""));
}



export {
    noPriceString, priceSign, numberList, CollectionName,
    priceToNumber, getShirtName, getPrice, getDescription, getAllColors,
    getFirstAvailableColorAndNum, getFirstShirtImages, setSelectedImage,
    setCustomShirtImage
};