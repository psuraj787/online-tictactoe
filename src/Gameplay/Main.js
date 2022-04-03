import React, { useEffect, useState } from "react";
import Header from "../UI/Header";
import { getAuth,onAuthStateChanged } from "firebase/auth";
import { useSelector } from "react-redux";

const Main = () => {
const [uid, setUid]=useState(null);

const authUid = useSelector((state) => state.auth.uid);

  useEffect(() => {
  setUid(authUid);     
  }, [authUid]);

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
