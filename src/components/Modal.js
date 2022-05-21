import { ref, set } from "firebase/database";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import uniqid from "uniqid";
import { DatabaseContext, LevelHolderContext, SetModalContext } from "./Context";

const Modal = ({ time }) => {
  const setModal = useContext(SetModalContext);
  const navigate = useNavigate();
  const levelHolder = useContext(LevelHolderContext);
  const database = useContext(DatabaseContext);
  const updateLeaderBoard = async function (username, time) {
    set(ref(database,"levels/" + levelHolder +  "/users/"+ uniqid()), {
      id: username,
      time: time
    });
  };

  return (
    <div className="modal">
      <div className="box">
        <div className="boxheader">You finished in {time} seconds!</div>
        <div className="form">
          <div className="formfield">
            <div>Enter your name to save score on the leaderboard</div>
            <label htmlFor="username">Username</label>
            <input id="username"></input>
          </div>
          <div className="buttons">
            <button
              onClick={() => {
                setModal(false);
                navigate("/");
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                  const username = document.querySelector('#username');
                  if (username.value !== "") {
                    updateLeaderBoard(username.value, time);
                    navigate("/leaderboard");
                    setModal(false)
                  }
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
