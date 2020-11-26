import React, {useEffect, useState} from 'react';
import AppRouter from './Router';
import { auth } from '../firebase';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
        setUserObj(user);
      }else{
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "INITIALIZING..."}
    </>
  );
}

export default App;
