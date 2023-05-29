import { Navigate } from "react-router-dom";
import { Button } from 'reactstrap';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/compat/auth";

// const auth = firebase.auth.getAuth();


function Logout({ user, setIsLogin, setUser }) {
    const logoutClick = () => {
        firebase.auth().signOut().then(() => {
            setIsLogin(false);
            setUser(null);
        });
    }
    return (
        <>
            {!user && <Navigate to="/" />}
            {user && <div className="button-page"><Button outline onClick={logoutClick}>Logout as {user.displayName}</Button></div>}
        </>
    );
}

export default Logout;