import { get, ref } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import uniqid from "uniqid";
import {
  DatabaseContext,
  LevelHolderContext,
  SetLevelHolderContext,
} from "./Context";

const LeaderBoard = () => {
  const setLevelHolder = useContext(SetLevelHolderContext);
  const levelHolder = useContext(LevelHolderContext);
  const navigate = useNavigate();
  const database = useContext(DatabaseContext);
  const [userData, setUserData] = useState({});
  const [userLevel, setUserLevel] = useState([]);
  const [active, setActive] = useState(parseInt(levelHolder.slice(5)));
  const getData = async () => {
    const snapshot1 = (
      await get(ref(database, "levels/" + levelHolder + "/users/"))
    ).val();
    let snapshot2 = (await get(ref(database, "levels/"))).val();
    snapshot2 = Object.keys(snapshot2).map((x) => {
      return snapshot2[x]["img"];
    });
    setUserData(snapshot1);
    setUserLevel(snapshot2);
  };
  useEffect(() => {
    getData();
  }, [levelHolder, setLevelHolder]);

  return (
    <div className="leaderboardholder">
      <div className="leaderboardheader">Leaderboard</div>
      <div className="playlevel">
        <button onClick={() => navigate("/game")}>Play This Level</button>
      </div>
      <div className="leaderboardlevel">
        {userLevel.map((x) => {
          return (
            <div
              className={userLevel.indexOf(x) + 1 === active ? "clicked" : null}
              onClick={(e) => {
                setLevelHolder("level" + (userLevel.indexOf(x) + 1));
                setActive(userLevel.indexOf(x) + 1);
              }}
              key={uniqid()}
            >
              <img src={x} key={uniqid()} alt=""></img>
              <div>Level {userLevel.indexOf(x) + 1}</div>
            </div>
          );
        })}
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Time (seconds)</th>
            </tr>
          </thead>
          <tbody>
            {userData
              ? Object.keys(userData)
                  .sort((a, b) => {
                    return userData[a].time - userData[b].time;
                  })
                  .map((x) => {
                    return (
                      <tr key={uniqid()}>
                        <td>{userData[x].id}</td>
                        <td>{userData[x].time}</td>
                      </tr>
                    );
                  })
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderBoard;
