import Header from "./components/Header";
import Main from "./components/Main";
import LevelSelector from "./components/LevelSelector";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {  getDatabase } from "firebase/database";
import {  useState } from "react";
import Modal from "./components/Modal";
import LeaderBoard from "./components/LeaderBoard";
import { get,ref } from "firebase/database";
import { useEffect } from "react";
import { DatabaseContext, LevelHolderContext, SetModalContext, SetLevelHolderContext } from "./components/Context";

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
      <DatabaseContext.Provider value={database}>
        <LevelHolderContext.Provider value={levelHolder}>
          <SetModalContext.Provider value={setModal}>
            <SetLevelHolderContext.Provider value={setLevelHolder}>
              {modal ? (
                <Modal time={time} ></Modal>
              ) : null}
              <div className="App">
                <Header />
                <Routes>
                  <Route
                    path="/"
                    element={
                      <LevelSelector
                        setReference={setReference}
                      ></LevelSelector>
                    }
                  ></Route>
                  <Route
                    path="/game"
                    element={
                      <Main
                        reference={reference}
                        setTime={setTime}
                      />
                    }
                  ></Route>
                  <Route
                    path="/leaderboard"
                    element={<LeaderBoard></LeaderBoard>}
                  ></Route>
                </Routes>
              </div>
            </SetLevelHolderContext.Provider>
          </SetModalContext.Provider>
        </LevelHolderContext.Provider>
      </DatabaseContext.Provider>
    </BrowserRouter>
  );
}

export default App;
