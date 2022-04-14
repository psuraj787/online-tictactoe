import React, { useState } from "react";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setUsernm] = useState("");
  const [password, setUserps] = useState("");

  const onUserNameChange = (event) => {
    setUsernm(event.target.value);
  };

  const onUserPassChange = (event) => {
    setUserps(event.target.value);
  };

  const onLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        localStorage.setItem("token", user.accessToken);

        setTimeout(() => {
          navigate("/Main");
        }, 1000);
      })
      .catch((error) => {
        console.log(error.message);
        //const errorCode = error.code;
        //const errorMessage = error.message;
      });
  };

  return (
    <React.Fragment>
      <div className={`${classes.container}`}>
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
              onClick={onLogin}
            >
              Sign In
            </button>
            {/* <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a> */}
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
