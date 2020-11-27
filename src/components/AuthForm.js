import React, { useState } from 'react';
import { auth } from '../firebase';


const AuthForm = () => {
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
            if(newAccount){
                await auth.createUserWithEmailAndPassword(email, password);
            }else{
                await auth.signInWithEmailAndPassword(email, password);
            }
        }catch(error){
            setError(error.message);
        }
    };
    const toggleAccount = () => {
        setNewAccount((prev) => !prev);
    };
    return(
        <>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="EMAIL" required value={email} onChange={onChange}/>
                <input name="password" type="password" placeholder="PASSWORD" required value={password} onChange={onChange}/>
                <input type="submit" value={newAccount ? "Create Account" : "LogIn"} />
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "LogIn" : "Create Account"}</span>
        </>
    );
};
export default AuthForm;