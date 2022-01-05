import "../Card.css";

const Card = ({card}) => {
const { image, name, status } = card;

  return (
    <div className="card">
      <img src={image} alt={name} className={status} />
      <div className="cardtitle">{name}</div>
    </div>
  );
};

Card.defaultProps = {
  card : {
  image: "../img/index.svg",
  name: "Default Card",
  status: "blank"
  }
};

export default Card;

//remember that rafce creates the export component
