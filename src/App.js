import './App.css';
import firebase from './firebase';
import Header from './UI/Header';


function App() {

  const getData = async () => {
    const res = await firebase.firestore().collection('user_master').doc('psuraj787');
    //console.log(res);
    res.get().then((snapshot) => {
      console.log(snapshot.data());
    })
  }

  return (
    <div>
<Header></Header>
      <h1 onClick={getData}>Tic Tac Toe</h1>
    </div>
  );
}

export default App;
