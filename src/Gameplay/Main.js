import React, { useEffect, useState } from "react";
import Header from "../UI/Header";
import { getAuth,onAuthStateChanged } from "firebase/auth";

const Main = () => {
  const auth = getAuth();
const [uid, setUid]=useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        // ...
      } else {
        localStorage.setItem('token',null);
        console.log('logged out');
      }
    });
    
  }, [auth]);

  return (
    <React.Fragment>
      <div>
        <p>
          Welcome to Online Tic Tac Toe <b>{uid}</b>
        </p>
      </div>
    </React.Fragment>
  );
};

export default Main;
