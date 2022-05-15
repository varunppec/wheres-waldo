import Header from "./components/Header";
import Main from "./components/Main";
import LevelSelector from "./components/LevelSelector";
import { Route, Routes, BrowserRouter } from "react-router-dom";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { child, get, getDatabase, onValue, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import LeaderBoard from "./components/LeaderBoard";
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
  const [reference, setReference] = useState({
    level1: {
      characters: {
        odlaw: {
          img: "https://firebasestorage.googleapis.com/v0/b/wheres-waldo-47536.appspot.com/o/odlaw_char.jpg?alt=media&token=ad7b0902-ecc2-473e-b902-71f92feb0e05",
          height: 9,
          left: 23.6,
          top: 46.8,
          width: 1.5,
        },
        waldo: {
          img: "https://firebasestorage.googleapis.com/v0/b/wheres-waldo-47536.appspot.com/o/waldo_char.jpg?alt=media&token=faadadf7-525e-4a26-8722-930a55d784b3",
          height: 7,
          left: 51.3,
          top: 46,
          width: 3.4,
        },
        wizard: {
          img: "https://firebasestorage.googleapis.com/v0/b/wheres-waldo-47536.appspot.com/o/wizard_char.jpeg?alt=media&token=dc7d0d81-3831-4a98-9140-8c2cd7000f3b",
          height: 8.5,
          left: 61.1,
          top: 46.1,
          width: 4.6,
        },
      },
      img: "https://firebasestorage.googleapis.com/v0/b/wheres-waldo-47536.appspot.com/o/waldo-official.jpg?alt=media&token=3d11d17a-6ac7-46d0-975d-041684e4fda8",
    },
    level2: {
      characters: {
        waldo: {
          height: 5,
          img: "https://firebasestorage.googleapis.com/v0/b/wheres-waldo-47536.appspot.com/o/waldo_char.jpg?alt=media&token=faadadf7-525e-4a26-8722-930a55d784b3",
          left: 83.7,
          top: 27.6,
          width: 1.8,
        },
      },
      img: "https://firebasestorage.googleapis.com/v0/b/wheres-waldo-47536.appspot.com/o/level-2.jpg?alt=media&token=28142a50-ddd0-48d5-b230-931ded0e08c9",
    },
    level3: {
      characters: {
        patrick: {
          img: "https://firebasestorage.googleapis.com/v0/b/wheres-waldo-47536.appspot.com/o/patrick_char.png?alt=media&token=53830e2e-79e9-406d-9855-72841fd1c6ca",
          height: 4,
          left: 94.9,
          top: 23,
          width: 2.5,
        },
      },
      img: "https://firebasestorage.googleapis.com/v0/b/wheres-waldo-47536.appspot.com/o/waldo.jpg?alt=media&token=d546e158-893d-40ab-b545-b556d4f98582",
    },
  });
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
            element={<LeaderBoard database={database} levelHolder={levelHolder}></LeaderBoard>}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
    //  {levelHolder === "" ? (
    //   <LevelSelector
    //     database={database}
    //     setReference={setReference}
    //     setLevelHolder={setLevelHolder}
    //   />
    // ) : (
    //   <Main reference={reference} />
    // )}
  );
}

export default App;
