import uniqid from "uniqid";
import { useState } from "react";
const Main = ({ reference, levelHolder, setModal, setTime }) => {
  const characters = reference[levelHolder].characters;
  const { img } = reference[levelHolder];
  let statuses = {};
  const [startTime, setStartTime] = useState(0);
  let endTime = 0;
  Object.keys(characters).forEach((x) => {
    statuses[x] = false;
  });
  let finished = true;
  const renderList = (e) => {
    const main = document.querySelector(".main");
    const waldo = document.querySelector("#image");
    const imageholder = document.querySelector(".imageholder");
    let testY =
      ((e.pageY - main.offsetTop - imageholder.offsetTop) * 100) /
      document.querySelector("#image").clientHeight;
    let testX =
      ((e.pageX -
        imageholder.offsetLeft -
        main.offsetLeft -
        document.querySelector("#image").offsetLeft) *
        100) /
      waldo.clientWidth;
    const list = document.querySelector("#list");
    list.classList.remove("hidden");
    list.style.left = `${testX}%`;
    list.style.top = `${testY}%`;
    document.addEventListener("mouseup", (e) => {
      e.stopPropagation();
      if (e.target.parentElement !== imageholder) {
        list.classList.add("hidden");
      }
    });
  };

  const verifyData = (e) => {
    const itemClicked = e.target.getAttribute("item");
    const target = e.target.parentElement.style;
    const targetDiv = document.createElement("div");
    targetDiv.style.width = "5px";
    targetDiv.style.height = "5px";
    targetDiv.style.position = "absolute";
    targetDiv.style.backgroundColor = "white";
    targetDiv.style.top = target.top;
    targetDiv.style.left = target.left;
    targetDiv.style.visibility = "hidden";
    document.querySelector(".imageholder").append(targetDiv);
    const character = characters[itemClicked];
    const div = document.createElement("div");
    div.style.top = `${character.top}%`;
    div.style.left = `${character.left}%`;
    div.style.width = `${character.width}%`;
    div.style.height = `${character.height}%`;
    div.style.position = "absolute";
    div.style.backgroundColor = "white";
    div.style.visibility = "hidden";
    div.id = itemClicked;
    document.querySelector(".imageholder").append(div);
    const rect1 = targetDiv.getBoundingClientRect();
    const rect2 = document.getElementById(itemClicked).getBoundingClientRect();
    let overlap = !(
      rect1.right < rect2.left ||
      rect1.left > rect2.right ||
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom
    );
    if (overlap) {
      statuses[itemClicked] = true;
      document.querySelector('.' + itemClicked).style.opacity = "50%";
    }
    finished = true;
    Object.keys(statuses).forEach((x) => {
      if (statuses[x] === false) {
        finished = false;
      }
    });
    if (finished) {
      endTime = new Date().getTime();
      let difference = (endTime - startTime) / 1000;
      setTime(difference);
      setModal(true);
    }
  };

  return (
    <div className="main">
      <div className="charholder">
        {Object.keys(characters).map((x) => {
          return (
            <div key={uniqid()} className={"chars " + x}>
              <img src={characters[x].img}></img>
              <div>{x}</div>
            </div>
          )
        })}
      </div>
      <div className="imageholder">
        <img
          id="image"
          onLoad={(e) => {
            setStartTime(new Date().getTime());
          }}
          src={img}
          alt=""
          onClick={(e) => {
            renderList(e);
          }}
        ></img>
        <div id="list" className="hidden">
          {Object.keys(characters).map((x) => {
            return (
              <div
                key={uniqid()}
                className="listitems"
                item={x}
                onClick={(e) => verifyData(e)}
              >
                {x}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Main;
