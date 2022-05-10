import Header from "./components/Header";
import Main from "./components/Main";
import LevelSelector from "./components/LevelSelector";
import { Route, Routes, BrowserRouter } from "react-router-dom";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { child, get, getDatabase, onValue, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
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
  const [levelHolder, setLevelHolder] = useState("");
  const [reference, setReference] = useState({});
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          {levelHolder === "" ? (
            <Route
              exact
              path="/"
              element={
                <LevelSelector
                  database={database}
                  setReference={setReference}
                  setLevelHolder={setLevelHolder}
                />
              }
            ></Route>
          ) : (
            <Route
              path="/game"
              element={<Main reference={reference} />}
            ></Route>
          )}
        </Routes>
      </BrowserRouter>
      {/* {levelHolder === "" ? (
        <LevelSelector
          database={database}
          setReference={setReference}
          setLevelHolder={setLevelHolder}
        />
      ) : (
        <Main reference={reference} />
      )} */}
    </div>
  );
}

export default App;
