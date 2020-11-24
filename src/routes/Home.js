import React, { useEffect, useState } from 'react';
import { db } from '../firebase';

const Home = () => {
    const [nweet, setNweet] = useState("");
    const [nweetArr, setNweetArr] = useState([]);
    const getNweets = async () => {
        const nweets = await db.collection('nweet').get();
        nweets.forEach(document => {
            const nweetObj = {
                ...document.data(),
                id: document.id,
            };
            setNweetArr(prev => [nweetObj, ...prev]);
        });
    };
    useEffect(() => {
        getNweets();
    }, []);
    const onSubmit = async (event) => {
        event.preventDefault();
        await db.collection('nweet').add({
            nweet,
            createdAt: Date.now(),
        });
        setNweet("");
    };
    const onChange = (event) => {
        const {target: {value}} = event;
        setNweet(value);
    };
    console.log(nweetArr);
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange = {onChange} type="text" placeholder="What's on your mind" maxLength={120} />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweetArr.map(nweet => (
                    <div key={nweet.id}>
                        <h4>{nweet.nweet}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Home;