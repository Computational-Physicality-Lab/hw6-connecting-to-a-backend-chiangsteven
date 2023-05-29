import { Navigate } from "react-router-dom";
import { Button } from 'reactstrap';
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import googleLogo from "../assets/images/google-logo.png"

// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/compat/auth";

// const auth = firebase.auth.getAuth();


function Login({ user, setIsLogin, setUser }) {
    const loginClick = () => {
        const providerGoogle = new firebase.auth.GoogleAuthProvider();
        providerGoogle.addScope('profile');
        providerGoogle.addScope('email');
        firebase.auth().signInWithPopup(providerGoogle)
            .then(function (result) {
                // 可以獲得 Google 提供 token，token可透過 Google API 獲得其他數據。  
                const token = result.credential.accessToken;
                const user = result.user;
                console.log(token);
                console.log(user);
                setIsLogin(true);
                setUser(user);
            })
            .catch(function (error) {
                console.log("login failed");
                console.log(error);
            })
    }
    return (
        <>
            {user && <Navigate to="/" />}
            {!user && <div className="button-page"><Button outline onClick={loginClick}>
                <img src={googleLogo} />Login with Google</Button></div>}
        </>
    );
}

export default Login;