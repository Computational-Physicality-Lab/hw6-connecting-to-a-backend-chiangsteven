import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import db from "./index";
import Footer from './component/footer';
import Header from './component/header';
import Products from './page/products';
import Details from './page/details';
import Cart from './page/cart';
import Home from './page/home';
import NotImp from './page/notImp';
import _ from "lodash";
import { CollectionName } from './shared/utils';
import { useState, useEffect } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import Login from './component/login';
import Logout from './component/logout';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import FromPictures from './page/pictures';


function App() {
  const [itemNum, setItemNum] = useState(0);
  const [myCart, setMyCart] = useState([]);
  const [cartItemUid, setUid] = useState(0);
  const [user, setUser] = useState(null);
  const [onShirtImg, setOnShirtImg] = useState(null);
  const [realData, setRealData] = useState();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const addCart = async (id, size, quantity, color) => {
    const ts = _.now();
    if (user) {
      await updateDoc(doc(db, CollectionName, user.uid), {
        num: parseInt(itemNum) + parseInt(quantity),
        content: arrayUnion({ id: id, size: size, quantity: quantity, color: color, cartId: cartItemUid, timeStamp: ts })
      });
    }
    setItemNum(parseInt(itemNum) + parseInt(quantity));
    setMyCart([{ id: id, size: size, quantity: quantity, color: color, cartId: cartItemUid, timeStamp: ts }, ...JSON.parse(JSON.stringify(myCart))]);
    setUid(cartItemUid + 1);

  };

  const removeCartItem = async (id) => {
    if (user) {
      await updateDoc(doc(db, CollectionName, user.uid), {
        num: parseInt(itemNum) - parseInt(myCart[id].quantity),
        content: arrayRemove(myCart[id])
      });
    }
    setItemNum(parseInt(itemNum) - parseInt(myCart[id].quantity));
    let tmpCart = JSON.parse(JSON.stringify(myCart));
    tmpCart.splice(id, 1);
    // console.log(tmpCart);
    // console.log(myCart);
    setMyCart(tmpCart);

  };
  const changeCartItemQty = async (id, qty) => {
    const originQty = myCart[id].quantity;
    const tmpCart = JSON.parse(JSON.stringify(myCart));
    tmpCart[id].quantity = qty;

    if (user) {
      await updateDoc(doc(db, CollectionName, user.uid), {
        num: parseInt(itemNum) - parseInt(originQty) + parseInt(qty),
        content: arrayRemove(myCart[id])
      });
      await updateDoc(doc(db, CollectionName, user.uid), {
        content: arrayUnion(tmpCart[id])
      });
    }

    setItemNum(parseInt(itemNum) - parseInt(originQty) + parseInt(qty));
    setMyCart(tmpCart);

  };
  const editCartItem = async (id, field, newValue) => {
    const tmpCart = JSON.parse(JSON.stringify(myCart));
    tmpCart[id][field] = newValue;
    if (user) {
      await updateDoc(doc(db, CollectionName, user.uid), {
        content: arrayRemove(myCart[id])
      });
      await updateDoc(doc(db, CollectionName, user.uid), {
        content: arrayUnion(tmpCart[id])
      });
    }
    setMyCart(tmpCart);
  };

  const cleanCart = () => {
    setItemNum(0);
    setMyCart([]);
  }

  async function fetchData(user) {
    if (!user) {
      return [undefined, undefined];
    }
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
  }

  const mergeData = async (myuser) => {
    const [num, content] = await fetchData(myuser);
    //if(num !== undefined  && num !== 0){

    await updateDoc(doc(db, CollectionName, myuser.uid), {
      num: num + itemNum
    });

    for (let i = 0; i < myCart.length; i++) {
      await updateDoc(doc(db, CollectionName, myuser.uid), {
        content: arrayUnion(myCart[i])
      });
    }

    const [newNum, newContent] = await fetchData(myuser);
    setItemNum(newNum);
    const sortedContent = _.sortBy(newContent, (c) => { return -c.timeStamp });
    setMyCart(sortedContent);
  }

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
        <Route path="/from_pictures" element={<FromPictures addCart={addCart} user={user}
          onShirtImg={onShirtImg} setOnShirtImg={setOnShirtImg} page={page} setPage={setPage}
          realData={realData} setRealData={setRealData} query={query} setQuery={setQuery} />} />
        <Route path="/details/:productID" element={<Details addCart={addCart} user={user} />} />
        <Route path="/shoppingcart"
          element={<Cart user={user} num={itemNum} myCart={myCart} iniData={iniData}
            removeCartItem={removeCartItem} changeQty={changeCartItemQty}
            editCartItem={editCartItem} />} />
        <Route path="/login" element={<Login user={user} setUser={setUser} mergeData={mergeData} />} />
        <Route path="/logout" element={<Logout user={user} setUser={setUser} cleanCart={cleanCart} />} />
        <Route path="/not_implemented" element={<NotImp />} />

      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
