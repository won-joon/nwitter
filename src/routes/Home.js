import React, { useEffect, useState } from 'react';
import Nweet from '../components/Nweet';
import NweetFactory from '../components/NweetFactory';
import { db, storage } from '../firebase';

const Home = ({userObj}) => {
    const [nweetArr, setNweetArr] = useState([]);
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
    
    return(
        <div>
            <NweetFactory userObj={userObj} />
            {nweetArr.map(nweet => (
                <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.authorId === userObj.uid}/>
            ))}
        </div>
    );
};
export default Home;