import {  onValue, ref } from "firebase/database";
import { Route } from "react-router-dom";
import uniqid from "uniqid";
const LevelSelector = ({ database, setLevelHolder, setReference }) => {
  let levels = {};
  onValue(ref(database, "levels/"), (snapshot) => {
    levels = snapshot.val();
    console.log(levels)
    console.log(Object.keys(levels));
  });

  const setLevelReference = (x) => {
    setLevelHolder(x);
    let referal = "levels/" + x + "/";
    onValue(ref(database, referal), (snapshot) => {
      setReference(snapshot.val());
    });
  };
  return (
      <div className="levelholder">
        {Object.keys(levels).map((x) => {
          return (
            <div key={uniqid()}>
              <img
                src={levels[x].img}
                style={{ width: 200 + "px" }}
                onClick={() => setLevelReference(x)}
                alt=""
              ></img>
            </div>
          );
        })}
      </div>

  );
};

export default LevelSelector;
