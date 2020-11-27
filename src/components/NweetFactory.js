import React, { useState } from 'react';
import {v4 as uuidv4 } from "uuid";
import { db, storage } from '../firebase';

const NweetFactory = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [att, setAtt] = useState("");
    const onSubmit = async (event) => {
        event.preventDefault();
        let photoUrl ="";
        if(att !== "" ){
            const photoRef = storage.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await photoRef.putString(att, "data_url");
            photoUrl = await response.ref.getDownloadURL();
        }
        const nwet = {
            text: nweet,
            createdAt: Date.now(),
            authorId: userObj.uid,
            photoUrl,
        }
        await db.collection('nweet').add(nwet);
        setNweet("");
        setAtt("");
    };
    const onChange = (event) => {
        const {target: {value}} = event;
        setNweet(value);
    };
    const onFileChange = (event) => {
        const {target:{files}} = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.readAsDataURL(theFile);
        reader.onloadend = (finish) => {
            const {currentTarget: {result}} = finish;
            setAtt(result);
        };
    };
    const onClearPhoto = () => setAtt(null);
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange = {onChange} type="text" placeholder="What's on your mind" maxLength={120} />
                <input type="file" accept="image/*" onChange={onFileChange}/>
                <input type="submit" value="Nweet" />
                {att && (
                    <div>
                        <img alt="" src={att} width="50px" height="50px" />
                        <button onClick={onClearPhoto}>Clear Image</button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default NweetFactory