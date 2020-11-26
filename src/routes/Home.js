import React, { useEffect, useState } from 'react';
import {v4 as uuidv4 } from "uuid";
import Nweet from '../components/Nweet';
import { db, storage } from '../firebase';

const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [nweetArr, setNweetArr] = useState([]);
    const [att, setAtt] = useState();
    /*
    const getNweets = async () => {
        const nweets = await db.collection('nweet').get();
        nweets.forEach(document => {
            const nweetObj = {
                ...document.data(),
                id: document.id, 
            };
            setNweetArr(prev => [nweetObj, ...prev]);
        });
    };*/
    useEffect(() => {
        ///getNweets();
        db.collection('nweet').onSnapshot(snapshot => {
            const nweets = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNweetArr(nweets);
        });
    }, []);
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
        reader.onloadend = (finish) => {
            const {currentTarget: {result}} = finish;
            setAtt(result);
        };
        reader.readAsDataURL(theFile);
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
            <div>
                {nweetArr.map(nweet => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.authorId === userObj.uid}/>
                ))}
            </div>
        </div>
    );
};
export default Home;