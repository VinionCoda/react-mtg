import { Fragment } from "react";
import "../../Card.css";

//  Generate a mtg card component 

const Card = (props) => {
  const { card } = props;
  const image = card.card_image;
  const name = card.card_name;
  const status = card.card_status;

  return (
    <Fragment key={card.card_id}>
    <div className="card">
      <img src={image} alt={name} className={status} />
      <div className="cardtitle">{name}</div>
    </div>
    </Fragment>
  );
};

Card.defaultProps = {
  image: "../img/index.svg",
  name: "Default Card",
  status: "blank",
};

export default Card;

//remember that rafce creates the export component
