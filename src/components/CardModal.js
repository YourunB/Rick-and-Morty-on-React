import React, { useRef } from "react";
import { appEvents } from "./events";

import "./CardModal.scss";

const CardModal = (props) => {
  const window = useRef(null);

  function closeModal() {
    window.current.className = "CardModal CardModal_hide";
    setTimeout(() => {
      appEvents.emit("EventCloseCardModal", props.episode);
    }, 1000);
  }

  return (
    <div ref={window} className="CardModal">
      <button
        className="CardModal__btn"
        onClick={() => {
          closeModal();
        }}
      >
        <img
          src="./images/svg/close.svg"
          alt="Left"
        />
      </button>
      <img
        className="CardModal__img"
        src={props.character.image}
        alt="Character"
      />
      <div className="CardModal-wrapper">
        <div className="CardModal__description">
          <span>Name:</span>
          <p>{props.character.name}</p>
        </div>
        <div className="CardModal__description">
          <span>Species:</span>
          <p>{props.character.species}</p>
        </div>
        <div className="CardModal__description">
          <span>Gender:</span>
          <p>{props.character.gender}</p>
        </div>
        <div className="CardModal__description">
          <span>Origin:</span>
          <p>{props.character.origin}</p>
        </div>
        <div className="CardModal__description">
          <span>Location:</span>
          <p>{props.character.location}</p>
        </div>
        <div className="CardModal__description">
          <span>Episode:</span>
          <p>{props.character.episode}</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CardModal);
