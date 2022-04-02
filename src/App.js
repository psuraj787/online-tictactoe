import './App.css';
import firebase from './firebase';
import Header from './UI/Header';
import React from "react";
import Login from "./Login/Login";
import Register from "./Login/Register";
import Contact from "./Misc/Contact";
import Main from "./Gameplay/Main";
import { useSelector } from 'react-redux';


import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


function App() {

  const isSignedIn = useSelector((state) => state.auth.isSignIn);
  
  const getData = async () => {
    const res = await firebase.firestore().collection('user_master').doc('psuraj787');
    //console.log(res);
    res.get().then((snapshot) => {
      console.log(snapshot.data());
    })
  }

  return (
    <div>

<BrowserRouter>
<Header />
      <Routes>        
        <Route path="/" element={<App />} />
        <Route path="Login" element={<Login />} />
        <Route path="Register" element={<Register />} />
        <Route path="Contact" element={<Contact />} />
        {console.log(isSignedIn && localStorage.getItem('token') !== 'null')}
        <Route path="Main" element={isSignedIn && localStorage.getItem('token') !== 'null' ? (
            <Main />
          ) : (
            <Navigate to="/Login" />
          )} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
