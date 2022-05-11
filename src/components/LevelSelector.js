import { get, onValue, ref, child } from "firebase/database";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import uniqid from "uniqid";
const LevelSelector = ({
  database,
  setLevelHolder,
  setReference,
}) => {
  const [levels, setLevels] = useState({})
  let navigate = useNavigate();
   const getData = async () => {
     const snapshot = await get(ref(database, 'levels/'));
     console.log(snapshot.val());
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
  );
};

export default LevelSelector;
