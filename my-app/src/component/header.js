import logo from '../assets/images/logo.png';
import cart from '../assets/images/cart.png';
import { Link } from "react-router-dom";

const headerNotImpText = ["CREATE FROM PICTURE", "CREATE YOUR OWN", "ABOUT US"];//, "LOG IN"

export default function Heander({ itemNum, user, refresh }) {
    return (
        <>
            <header>
                <div className="head-container">
                    <Link className="logo" to="/"><img src={logo} alt="logo.png" /></Link>
                    <h1 className="name">Scotty Shirts U Illustrate (SSUI)</h1>
                    <Link className="shopping-cart" onClick={refresh} to="/shoppingcart">
                        <img src={cart} alt="shopping-cart" />
                        <p>{itemNum}</p>
                    </Link>
                </div>
                <div className="head-link">
                    <Link to="/products">T-SHIRTS</Link>
                    {headerNotImpText.map((text, id) =>
                        (<Link key={id} to="/not_implemented">{text}</Link>))}
                    {!user && <Link to="/login">LOG IN</Link>}
                    {user && <Link to="/logout"><img className='avatar' src={user.photoURL} /><>{user.displayName}</></Link>}
                </div>
            </header>
        </>
    );
}