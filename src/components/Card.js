import "../Card.css";

const Card = (props) => {
  const { image, name, status } = props;

  return (
    <div className="card card--mod">
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
