import React, { useEffect, useState } from "react";
import { getLoginDataByUserId, addInGameData } from "../store/auth";
import firebase from "../firebase";
import { useSelector, useDispatch } from "react-redux";

const Main = () => {
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const authUid = useSelector((state) => state.auth.uid);

  const [userList, setUserList] = useState([]);
  let data = [];

  useEffect(() => {
    dispatch(getLoginDataByUserId(authUid)).then((data) => {
      if (data.payload) {
        setName(data.payload.name);

        dispatch(
          addInGameData({
            email: data.payload.email,
            name: data.payload.name,
            ingame: false,
            uid: authUid,
          })
        ).then((data) => {});
      }
    });
  }, [authUid, dispatch]);

  const listenUsers = () => {
    const query = firebase.firestore().collection("user_online");

    query.onSnapshot(
      (querySnapshot) => {
        console.log(querySnapshot);
        data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("All data in 'books' collection", data);
        setUserList(data);
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );
  };

  useEffect(() => {
    listenUsers();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <div>
        <p>
          Welcome to Online Tic Tac Toe <b>{name}</b>
        </p>
      </div>
      <div>
        <ul>
          {userList.length > 0 &&
            userList.map((user) => (
              <li key={user.uid}>
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                <p>{user.ingame}</p>
              </li>
            ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Main;
