import React from "react";
import "./card.css";

import {
  PLACEHOLDER_CARDBACK_PATH,
  PLACEHOLDER_CARD_PATH,
} from "../../constants/index";

function Card(props) {
  let flippedClass = "";
  let matchedClass = "";
  let cardFrontClass = "";

  if (props.flipped) {
    flippedClass = "flipped";
  }
  if (props.matched) {
    matchedClass = "inative";
    cardFrontClass = "grayscale";
  }

  const handleClickCaptureCard = (event) => {
    if (props.flipped) {
      event.stopPropagation();
    }
  };

  return (
    <div
      className={"card " + flippedClass + matchedClass}
      data-logo={props.card}
      onClick={() => {
        props.onClickCard(props.card);
      }}
      onClickCapture={handleClickCaptureCard}
    >
      <img
        src={PLACEHOLDER_CARDBACK_PATH}
        className="card-back"
        alt="backCard"
      />
      {/* <img src= {PLACEHOLDER_CARD_PATH+props.name+".png"} className="card-front" alt={props.name} />  */}
      <img
        src={`${PLACEHOLDER_CARD_PATH}${props.card}.png`}
        className={"card-front " + cardFrontClass}
        alt={props.card}
      />
    </div>
  );
}

export default Card;
