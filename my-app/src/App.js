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
import _ from "lodash";
import { CollectionName } from './shared/utils';
import { useState, useEffect } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { createApi } from 'unsplash-js';
import Login from './component/login';
import Logout from './component/logout';
import { doc, collection, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";


function App() {
  const [itemNum, setItemNum] = useState(0);
  const [myCart, setMyCart] = useState([]);
  const [cartItemUid, setUid] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const addCart = async (id, size, quantity, color) => {
    const ts = _.now();
    if (user) {
      await updateDoc(doc(db, CollectionName, user.uid), {
        num: parseInt(itemNum) + parseInt(quantity),
        content: arrayUnion({ id: id, size: size, quantity: quantity, color: color, cartId: cartItemUid, timeStamp: ts })
      });


      setItemNum(parseInt(itemNum) + parseInt(quantity));
      setMyCart([{ id: id, size: size, quantity: quantity, color: color, cartId: cartItemUid, timeStamp: ts }, ...JSON.parse(JSON.stringify(myCart))]);
      setUid(cartItemUid + 1);
    }
  };
  const removeCartItem = async (id) => {
    if (user) {
      await updateDoc(doc(db, CollectionName, user.uid), {
        num: parseInt(itemNum) - parseInt(myCart[id].quantity),
        content: arrayRemove(myCart[id])
      });
      setItemNum(parseInt(itemNum) - parseInt(myCart[id].quantity));
      let tmpCart = JSON.parse(JSON.stringify(myCart));
      tmpCart.splice(id, 1);
      // console.log(tmpCart);
      // console.log(myCart);
      setMyCart(tmpCart);
    }
  };
  const changeCartItemQty = async (id, qty) => {
    if (user) {
      const originQty = myCart[id].quantity;


      let tmpCart = JSON.parse(JSON.stringify(myCart));
      tmpCart[id].quantity = qty;

      // const docRef = doc(db, user.uid, myCart[id]);
      // console.log("line 61")
      // const docSnap = await getDoc(docRef);

      // if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      await updateDoc(doc(db, CollectionName, user.uid), {
        num: parseInt(itemNum) - parseInt(originQty) + parseInt(qty),
        content: arrayRemove(myCart[id])
      });
      await updateDoc(doc(db, CollectionName, user.uid), {
        content: arrayUnion(tmpCart[id])
      });
      setItemNum(parseInt(itemNum) - parseInt(originQty) + parseInt(qty));
      setMyCart(tmpCart);
      // } else {
      //   // docSnap.data() will be undefined in this case
      //   console.log("No such document!");
      // }

    }
  };
  const editCartItem = (id, field, newValue) => {
    let tmpCart = [...myCart];
    tmpCart[id][field] = newValue;
    setMyCart(tmpCart);
  };
  async function fetchData(user) {

    const docRef = doc(db, CollectionName, user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { num, content } = docSnap.data();
      console.log("Document data:", docSnap.data());
      return [num, content];

    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      await setDoc(doc(db, CollectionName, user.uid), {
        num: 0,
        content: []
      });
      return [undefined, undefined];
    }



  }
  const iniData = async () => {
    const [num, content] = await fetchData(user);
    setItemNum(num === undefined ? 0 : num);

    if (content) {
      const sortedContent = _.sortBy(content, (c) => { return -c.timeStamp });
      setMyCart(sortedContent);
    }
    else {
      setMyCart([]);
    }
  }
  // useEffect(() => {
  //   db.collection("anchors").get().then(querySnapshot => {
  //     console.log(querySnapshot.docs.map(doc => doc.data()));
  //   })


  // });
  useEffect(() => {

    if (user) {
      iniData();
    }
    else {
      setItemNum(0);
      setMyCart([]);
    }
  }, [user]);
  useEffect(() => {
    console.log(myCart);
  }, [myCart]);
  return (
    <HashRouter>
      <Header itemNum={itemNum} user={user} refresh={iniData} />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/details/:productID" element={<Details addCart={addCart} user={user} />} />
        <Route path="/shoppingcart"
          element={<Cart user={user} num={itemNum} myCart={myCart} iniData={iniData}
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
