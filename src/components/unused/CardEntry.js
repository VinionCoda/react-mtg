import { useEffect, useState } from "react";

const CardEntry = ({card}) => {
  const [cardset, setCardset] = useState("");
  const reg = /[^{}]+/g
   
  const str = 	"{1}{B}{B}{B}";



  useEffect(() => {
    const id = card.set_id;
    const url = "https://api.scryfall.com/sets/" + id;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCardset(data.icon_svg_uri);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [card]);

  return (
    <li className="list__item">

      <img src={cardset} alt={card.set} className="list__item__svg"/> {card.name} <span className="list__item__text .card-symbol-0 .card-symbol-1"> {card.mana_cost} </span>
    </li>
  );
};

CardEntry.defaultProps = {
  card: {
    name: "Lodestone Golem",
    mana_cost: "{4}",
    set_id: "28cac015-43df-4e88-90d0-95dcdd894834",
  },
};

export default CardEntry;
