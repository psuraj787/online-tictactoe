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

  return (
    <div>

<Header />
<p>This is App</p>
      <Routes>        
        {/* <Route path="/" element={<App />} /> */}
        <Route path="Login" element={isSignedIn && localStorage.getItem('token') !== null ? (
            <Navigate to="/Main" />
          ) : (
            <Login />
          )} />
        <Route path="Register" element={<Register />} />
        <Route path="Contact" element={<Contact />} />
        <Route path="Main" element={isSignedIn && localStorage.getItem('token') !== null ? (
            <Main />
          ) : (
            <Navigate to="/Login" />
          )} />
        {/* <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        /> */}
      </Routes>
    </div>
  );
}

export default App;
