import { get, onValue, ref,  } from "firebase/database";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import uniqid from "uniqid";
import React from "react";
const LevelSelector = ({
  database,
  setLevelHolder,
  setReference,
}) => {
  const [levels, setLevels] = useState({})
  let navigate = useNavigate();
   const getData = async () => {
     const snapshot = await get(ref(database, 'levels/'));
     let value = await snapshot.val();
     setLevels(value);
   }
   useEffect(() => {
     getData();
   }, []);
  const setLevelReference = (x) => {
    setLevelHolder(x);
    let referal = "levels/";
    onValue(ref(database, referal), (snapshot) => {
      setReference(snapshot.val());
    });
    navigate("/game");
    
  };
  return (
    <React.Fragment>
      <div className="levelholder">
        {Object.keys(levels).map((x) => {
          return (
            <div key={uniqid()}>
              <img
                src={levels[x].img}
                onClick={() => setLevelReference(x)}
                alt=""
              ></img>
              <div>Level {Object.keys(levels).indexOf(x) + 1}</div>
            </div>
          );
        })}
      </div>
      <div id="leaderboard">
        <div>
          <div>
            Do you have what it takes to be on the leaderboard?
          </div>
          <div>
            Start finding waldo now!
          </div>
        </div>
        <button onClick={() => {
          navigate("/leaderboard")
        }}>View Leaderboard</button>
      </div>
    </React.Fragment>
  );
};

export default LevelSelector;
