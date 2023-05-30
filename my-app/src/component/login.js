import { Navigate } from "react-router-dom";
import { Button } from 'reactstrap';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import googleLogo from "../assets/images/google-logo.png"

function Login({ user, setUser, mergeData }) {
    const loginClick = () => {
        const providerGoogle = new firebase.auth.GoogleAuthProvider();
        providerGoogle.addScope('profile');
        providerGoogle.addScope('email');
        firebase.auth().signInWithPopup(providerGoogle)
            .then(function (result) {
                // 可以獲得 Google 提供 token，token可透過 Google API 獲得其他數據。  
                // const token = result.credential.accessToken;
                const user = result.user;
                setUser(user);
                mergeData(user);
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
                <img src={googleLogo} alt="googleLogo" />Login with Google</Button></div>}
        </>
    );
}

export default Login;