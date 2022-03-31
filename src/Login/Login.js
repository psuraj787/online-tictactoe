import React, { useState } from "react";
import Header from "../UI/Header";
import classes from "./Login.module.css";
import firebase from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [usernm, setUsernm]=useState('');
  const [userps, setUserps]=useState('');

  const onUserNameChange=(event)=>{
setUsernm(event.target.value);
  };

  const onUserPassChange=(event)=>{
    setUserps(event.target.value);
      };

  const getData = async () => {
    const res = firebase.firestore().collection("user_master");
    const snapshot = await res
      .where("id", "==", usernm)
      .where("password", "==", userps)
      .get();
    
    if (snapshot.empty) {
      alert("Invalid username/password entered..!");
      return;
    }

    snapshot.forEach((doc) => {
      console.log(doc.data());
      navigate("/Contact");
    });
  };

  return (
    <React.Fragment>
      <Header />
      <div className={`w-full max-w-xs ${classes.container}`}>
        <form className="bg-white rounded-xl shadow-2xl px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              onChange={onUserNameChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              onChange={onUserPassChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={getData}
            >
              Sign In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2022 P&G Corp. All rights reserved.
        </p>
      </div>
    </React.Fragment>
  );
};

export default Login;
