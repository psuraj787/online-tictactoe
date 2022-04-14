import { createSlice, configureStore } from "@reduxjs/toolkit";
import firebase from "../firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";

const InitialAuthState = {
  isSignIn: localStorage.getItem("token") == null ? false : true,
  userToken: null,
};

// export const getInGameData = createAsyncThunk(
//   "user/getInGameData",
//   async (userId, thunkAPI) => {
//     const query = await firebase
//       .firestore()
//       .collection("user_online")
//       .where("uid", "!=", userId)
//       .get();
//     const resultArr = [];
//     query.forEach((doc) => {
//       resultArr.push(doc.data());
//     });

//     return resultArr;
//   }
// );

export const getLoginDataByUserId = createAsyncThunk(
  "user/getLoginDataByUserId",
  async (userId, thunkAPI) => {
    const query = await firebase
      .firestore()
      .collection("user_master")
      .where("uid", "==", userId)
      .get();

    const snapshot = query.docs[0];
    const data = snapshot.data();

    return data;
  }
);

export const checkUserExists = createAsyncThunk(
  "user/checkUserExists",
  async (userEmail, thunkAPI) => {
    const query = await firebase
      .firestore()
      .collection("user_master")
      .where("email", "==", userEmail)
      .get();

    if (!query.empty) {
      return true;
    } else {
      return false;
    }
    //return JSON.parse(data);
  }
);

export const addRegistrationData = createAsyncThunk(
  "user/addRegistrationData",
  async (registrationData, thunkAPI) => {
    firebase
      .firestore()
      .collection("user_master")
      .doc(registrationData.uid)
      .set({
        email: registrationData.email,
        name: registrationData.name,
        password: registrationData.password,
        uid: registrationData.uid,
      })
      .then(() => {
        //alert("User registered!");
      });
  }
);

export const addInGameData = createAsyncThunk(
  "user/addInGameData",
  async (inGameData, thunkAPI) => {
    firebase
      .firestore()
      .collection("user_online")
      .doc(inGameData.uid)
      .set({
        email: inGameData.email,
        name: inGameData.name,
        ingame: false,
        uid: inGameData.uid,
      })
      .then(() => {
        //alert("User registered!");
      });
  }
);

export const authSlice = createSlice({
  initialState: InitialAuthState,
  name: "auth",
  reducers: {
    signInAction: (state, action) => {
      state.isSignIn = true;
      state.userToken = action.payload.userToken;
      state.uid = action.payload.uid;
    },
    signOutAction: (state, action) => {
      state.isSignIn = false;
      state.userToken = null;
      state.uid = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLoginDataByUserId.fulfilled, (state, action) => {
      state.isSignIn = true;
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
    });
  },
});

const store = configureStore({
  reducer: { auth: authSlice.reducer },
});

export const signInActions = authSlice.actions;

export default store;
