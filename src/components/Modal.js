import { ref, child, push, update, get, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import uniqid from "uniqid";

const Modal = ({ time, setModal, database, levelHolder }) => {
  const navigate = useNavigate();
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
          <div>Enter your name to save score on the leaderboard</div>
          <label htmlFor="username">Username</label>
          <input id="username"></input>
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
                    navigate("/");
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
