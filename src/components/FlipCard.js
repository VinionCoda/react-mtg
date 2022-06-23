import { Fragment } from "react";
import "../FlipCard.css";

const FlipCard = ({ card }) => {
  const { card_name, card_image, card_status, card_back } = card;

  const flip = (e) => {
    const inner =
      e.target.parentElement.parentElement.getElementsByClassName(
        "flip-card-inner"
      );
    Array.from(inner)[0].classList.toggle("do-card-flip");
    let flip_name =
      e.target.parentElement.parentElement.getElementsByClassName(
        "flip-card-title"
      );
    flip_name = Array.from(flip_name)[0];
    flip_name.innerText =
      flip_name.innerText === card_name ? card_back.card_name : card_name;
  };

  return (
    <Fragment key={card.card_id}>
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <div className="card flip-card-content">
            <img src={card_image} alt={card_name} className={card_status} />
          </div>
        </div>
        <div className="flip-card-back">
          <div className="card flip-card-content">
            <img
              src={card_back.card_image}
              alt={card_back.card_name}
              className={card_status}
            />
          </div>
        </div>
      </div>
      <div className="flip-card-title">{card_name}</div>
      <div className="flip-icon" onClick={(e) => flip(e)}>
        
        <img src="../img/flip_arrow.png" alt="flip arrow" />
      </div>
    </div>
    </Fragment>
  );
};

FlipCard.defaultProps = {
  card: {
    card_image: "../img/index_front.svg",
    card_name: "Default Front",
    card_back: {
      card_image: "../img/index_back.svg",
      card_name: "Default Back",
    },
    card_status: "blank",
  },
};

export default FlipCard;
