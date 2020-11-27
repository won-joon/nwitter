import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, db } from '../firebase';

const Profile = ({ refreshUser ,userObj }) => {
    const history = useHistory();
    const onLogOut = () => {
        auth.signOut();
        history.push('/');
    };
    /*
    const getNweets = async () => {
        const nweets = await db.collection('nweet').where("authorId", "==", userObj.uid).orderBy("createdAt").get();
        console.log(nweets.docs.map((doc) => doc.data()));
    };
    useEffect(() => {
        getNweets();
    }, []); */
    const [newDisplayName, setNewDisplayName] = useState("");
    const onChange = (event) => {
        const {target: {value}} = event;
        setNewDisplayName(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await userObj.updateProfile({
                displayName: newDisplayName,
            });
            refreshUser();
        }
    };
    return(
        <>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} type="text" placeholder="Display Name" value={newDisplayName}/>
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick ={onLogOut} >LogOut</button>
        </>
    );
};

export default Profile;