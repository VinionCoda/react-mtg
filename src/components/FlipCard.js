import "../FlipCard.css";

const FlipCard = ({ card }) => {
  const { front_name, front_img, back_name, back_img, status } = card;
  let card_name = front_name;

  const flip = (e) => {
    console.log();
    const inner = e.target.parentElement.parentElement.getElementsByClassName("flip-card-inner");
    Array.from(inner)[0].classList.toggle("do-card-flip");
    let card_name =  e.target.parentElement.parentElement.getElementsByClassName("flip-card-title");
    card_name = Array.from(card_name)[0];
    card_name.innerText =
      card_name.innerText === front_name ? back_name : front_name;
  };

  return (
    <div className="flip-card" >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <div className="card">
            <img src={front_img} alt={front_name} className={status} />
          </div>
        </div>
        <div className="flip-card-back">
          <div className="card">
            <img src={back_img} alt={back_name} className={status} />
          </div>
        </div>
      </div>
      <div className="flip-card-title">
        {card_name}
      </div >
      <div className="flip-icon" onClick={(e) => flip(e)}> <img src="../img/flip_arrow.png" alt= "flip arrow" /></div>
    </div>
  );
};

FlipCard.defaultProps = {
  card: {
    front_img: "../img/index_front.svg",
    front_name: "Default Front",
    back_img: "../img/index_back.svg",
    back_name: "Default Back",
    status: "blank",
  },
};

export default FlipCard;
