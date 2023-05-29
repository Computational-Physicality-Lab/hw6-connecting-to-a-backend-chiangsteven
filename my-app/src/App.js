import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import db from "./index";
import Footer from './component/footer';
import Header from './component/header';
import Products from './products';
import Details from './details';
import Cart from './cart';
import Home from './home';
import NotImp from './notImp';
import { useState, useEffect } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { createApi } from 'unsplash-js';
import Login from './component/login';
import Logout from './component/logout';

function App() {
  const [itemNum, setItemNum] = useState(0);
  const [myCart, setMyCart] = useState([]);
  const [cartItemUid, setUid] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const addCart = (id, size, quantity, color) => {
    setItemNum(parseInt(itemNum) + parseInt(quantity));
    setMyCart([{ id: id, size: size, quantity: quantity, color: color, cartId: cartItemUid }, ...myCart]);
    setUid(cartItemUid + 1);
  };
  const removeCartItem = (id) => {
    setItemNum(parseInt(itemNum) - parseInt(myCart[id].quantity));
    let tmpCart = [...myCart];
    tmpCart.splice(id, 1);
    // console.log(tmpCart);
    // console.log(myCart);
    setMyCart(tmpCart);
  };
  const changeCartItemQty = (id, qty) => {
    let originQty = myCart[id].quantity;
    setItemNum(parseInt(itemNum) - parseInt(originQty) + parseInt(qty));
    let tmpCart = [...myCart];
    tmpCart[id].quantity = qty;
    setMyCart(tmpCart);
  };
  const editCartItem = (id, field, newValue) => {
    let tmpCart = [...myCart];
    tmpCart[id][field] = newValue;
    setMyCart(tmpCart);
  };

  useEffect(() => {
    db.collection("anchors").get().then(querySnapshot => {
      console.log(querySnapshot.docs.map(doc => doc.data()));
    })
  })

  return (
    <HashRouter>
      <Header itemNum={itemNum} user={user} />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/details/:productID" element={<Details addCart={addCart} />} />
        <Route path="/shoppingcart"
          element={<Cart user={user} num={itemNum} myCart={myCart}
            removeCartItem={removeCartItem} changeQty={changeCartItemQty} editCartItem={editCartItem} />} />
        <Route path="/login" element={<Login user={user} setIsLogin={setIsLogin} setUser={setUser} />} />
        <Route path="/logout" element={<Logout user={user} setIsLogin={setIsLogin} setUser={setUser} />} />
        <Route path="/not_implemented" element={<NotImp />} />

      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
