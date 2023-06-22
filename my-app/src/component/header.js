import logo from '../assets/images/logo.png';
import cart from '../assets/images/cart.png';
import { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";

const headerNotImpText = ["CREATE YOUR OWN", "ABOUT US"];//"CREATE FROM PICTURE", "LOG IN"

export default function Heander({ itemNum, user, refresh }) {
    const location = useLocation();
    useEffect(() => {
        refresh();
    }, [location]);
    return (
        <>
            <header>
                <div className="head-container">
                    <Link className="logo" to="/"><img src={logo} alt="logo.png" /></Link>
                    <h1 className="name">Scotty Shirts U Illustrate (SSUI)</h1>
                    <Link className="shopping-cart" to="/shoppingcart">
                        <img src={cart} alt="shopping-cart" />
                        <p>{itemNum}</p>
                    </Link>
                </div>
                <div className="head-link">
                    <Link to="/products">T-SHIRTS</Link>
                    <Link to="/from_pictures">CREATE FROM PICTURE</Link>
                    {headerNotImpText.map((text, id) =>
                        (<Link key={id} to="/not_implemented">{text}</Link>))}
                    {!user && <Link to="/login">LOG IN</Link>}
                    {user && <Link to="/logout"><img className='avatar' src={user.photoURL} alt="userAvatar" /><>{user.displayName}</></Link>}
                </div>
            </header>
        </>
    );
}