import React from "react";
import { appEvents } from "./events";

import "./Card.scss";

const Card = (props) => {
  function checkCard() {
    appEvents.emit("EventCheckCard", props);
  }

  return (
    <div
      className="Card"
      onClick={() => {
        checkCard();
      }}
    >
      <img className="Card__img" src={props.image}></img>
      <p className="Card__name">{props.name}</p>
    </div>
  );
};

export default React.memo(Card);
