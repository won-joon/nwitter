import React from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';

const Profile = () => {
    const history = useHistory();
    const onLogOut = () => {
        auth.signOut();
        history.push('/');
    };
    return(
        <>
            <button onClick ={onLogOut} >LogOut</button>
        </>
    );
};

export default Profile;