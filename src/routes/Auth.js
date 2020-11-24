import React, { useState } from 'react';
import { auth, firebaseInst } from '../firebase';

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (e) => {
        const {target: {name, value}} = e;
        if(name === "email"){
            setEmail(value)
        }else if(name === "password"){
            setPassword(value);
        }
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        try{
            let data;
            if(newAccount){
                data = await auth.createUserWithEmailAndPassword(email, password);
            }else{
                data = await auth.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        }catch(error){
            setError(error.message);
        }
    };

    const toggleAccount = () => {
        setNewAccount((prev) => !prev);
    };
    const onSocialClick = async (event) => {
        const {target:{name}} = event;
        let provider;
        if(name === "google"){
            provider = new firebaseInst.auth.GoogleAuthProvider();
        }
        const data = await auth.signInWithPopup(provider);
        console.log(data);
    };
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="EMAIL" required value={email} onChange={onChange}/>
                <input name="password" type="password" placeholder="PASSWORD" required value={password} onChange={onChange}/>
                <input type="submit" value={newAccount ? "Create Account" : "LogIn"} />
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "LogIn" : "Create Account"}</span>
            <div>
                <button onClick={onSocialClick} name="google">Continue With Google</button>
            </div>
        </div>
    );
};
export default Auth;