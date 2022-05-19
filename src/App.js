import Header from "./components/Header";
import Main from "./components/Main";
import LevelSelector from "./components/LevelSelector";
import { Route, Routes, BrowserRouter } from "react-router-dom";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {  getDatabase } from "firebase/database";
import {  useState } from "react";
import Modal from "./components/Modal";
import LeaderBoard from "./components/LeaderBoard";
import { get,ref } from "firebase/database";
import { useEffect } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyW740OQL5iURUaJLROilDB1wXbIzJgAU",
  authDomain: "wheres-waldo-47536.firebaseapp.com",
  projectId: "wheres-waldo-47536",
  storageBucket: "wheres-waldo-47536.appspot.com",
  messagingSenderId: "78836361005",
  appId: "1:78836361005:web:8dcdfa85907f7e097995a4",
  measurementId: "G-ZME372XDZV",
  databaseURL:
    "https://wheres-waldo-47536-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function App() {
  const [time, setTime] = useState(0);
  const [modal, setModal] = useState(false);
  const [levelHolder, setLevelHolder] = useState("level1");
  const [reference, setReference] = useState({});
  const getData = async () => {
    const snapshot = await get(ref(database, 'levels/'));
    let value = await snapshot.val();
    setReference(value);
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <BrowserRouter>
      {modal ? (
        <Modal time={time} setModal={setModal} database={database} levelHolder={levelHolder}></Modal>
      ) : null}
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <LevelSelector
                database={database}
                setReference={setReference}
                setLevelHolder={setLevelHolder}
              ></LevelSelector>
            }
          ></Route>
          <Route
            path="/game"
            element={
              <Main
                reference={reference}
                levelHolder={levelHolder}
                setModal={setModal}
                setTime={setTime}
              />
            }
          ></Route>
          <Route
            path="/leaderboard"
            element={<LeaderBoard database={database} levelHolder={levelHolder} setLevelHolder={setLevelHolder}></LeaderBoard>}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
