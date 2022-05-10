import style from "../styles/Header.css";
import uniqid from "uniqid"
const Main = (reference) => {
  console.log(reference.reference);
  const { waldo, odlaw, wizard } = reference.reference.characters;
  const characters = reference.reference.characters;
  const { img } = reference.reference;
  let statuses = {};
  Object.keys(characters).forEach((x) => {
    statuses[x] = false;
  })
  let finished = true;
  const renderList = (e) => {
    const main = document.querySelector(".main");
    const waldo = document.querySelector("#image");
    const imageholder = document.querySelector(".imageholder");
    let testY =
      ((e.pageY - main.offsetTop) * 100) /
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
    }
    finished = true;
    Object.keys(statuses).forEach((x) => {
      if (statuses[x] === false) {
        finished = false;
      }
    });
    if (finished) {
      console.log("done");
    }
  };

  return (
    <div className="main" style={style}>
      <div className="imageholder">
        <img
          id="image"
          src={img}
          alt=""
          onClick={(e) => {
            renderList(e);
          }}
        ></img>
        <div id="list" className="hidden">
          {Object.keys(characters).map((x) => {
            return (
              <div key={uniqid()} className="listitems" item={x} onClick={(e) => verifyData(e)}>
                {x}
              </div>
            );
          })}
          {/* <div
            className="listitems"
            item="waldo"
            onClick={(e) => verifyData(e)}
          >
            Waldo
          </div>
          <div
            className="listitems"
            item="odlaw"
            onClick={(e) => verifyData(e)}
          >
            Odlaw
          </div>
          <div
            className="listitems"
            item="wizard"
            onClick={(e) => verifyData(e)}
          >
            Wizard
          </div> */}
        </div>
        {/* <div className="test1" style={{visibility: "hidden"}}></div>
        <div className="test2"></div>
        <div className="test3"></div> */}
      </div>
    </div>
  );
};

export default Main;
