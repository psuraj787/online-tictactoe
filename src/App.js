import './App.css';
import Header from './UI/Header';
import React from "react";
import Login from "./Login/Login";
import Register from "./Login/Register";
import Contact from "./Misc/Contact";
import Main from "./Gameplay/Main";
import { useSelector } from 'react-redux';


import { Routes, Route, Navigate } from "react-router-dom";


function App() {

  const isSignedIn = useSelector((state) => state.auth.isSignIn);
  
  // const getData = async () => {
  //   const res = await firebase.firestore().collection('user_master').doc('psuraj787');
  //   //console.log(res);
  //   res.get().then((snapshot) => {
  //     console.log(snapshot.data());
  //   })
  // }

  return (
    <div>

<Header />
<Routes>        
               
        <Route path="Login" element={isSignedIn ? (
            <Navigate to="/Main" />
          ) : (
            <Login />
          )} />
        <Route path="Register" element={<Register />} />
        <Route path="Contact" element={<Contact />} />
        <Route path="Main" element={isSignedIn ? (
            <Main />
          ) : (
            <Navigate to="/Login" />
          )} />
      </Routes>
    </div>
  );
}

export default App;
