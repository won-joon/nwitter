import React from 'react';
import AuthForm from '../components/AuthForm';
import { auth, firebaseInst } from '../firebase';

const Auth = () => {
    const onSocialClick = async (event) => {
        const {target:{name}} = event;
        let provider;
        if(name === "google"){
            provider = new firebaseInst.auth.GoogleAuthProvider();
        }
        await auth.signInWithPopup(provider);
    };
    return(
        <div>
            <AuthForm />
            <div>
                <button onClick={onSocialClick} name="google">Continue With Google</button>
            </div>
        </div>
    );
};
export default Auth;