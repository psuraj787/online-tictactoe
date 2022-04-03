import React, { useEffect, useState } from "react";
import { getAuth,onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Main = () => {
  console.log('on main');
  const auth = getAuth();
const [uid, setUid]=useState(null);
const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        // ...
      } else {
       // localStorage.setItem('token','null');
        console.log('logged out');
        //navigate("/Login");
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
