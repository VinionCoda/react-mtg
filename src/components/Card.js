import "../Card.css";

const Card = (props) => {
  const { card } = props;

  const image = card.card_image;
  const name = card.card_name;
  const status = card.card_status;

  return (
    <div className="card">
      <img src={image} alt={name} className={status} />
      <div className="cardtitle">{name}</div>
    </div>
  );
};

Card.defaultProps = {
  image: "../img/index.svg",
  name: "Default Card",
  status: "blank",
};

export default Card;

//remember that rafce creates the export component
