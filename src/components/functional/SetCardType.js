import Card from "./Card";
import FlipCard from "./FlipCard";
import { useState,  useLayoutEffect } from "react";

/* Generates either a regular card or a Flip Card */
const SetCardType = ({ card }) => {
  const [flip, setFlip] = useState(false);

  useLayoutEffect(() => {
    if (Object.keys(card).length > 0) {
      setFlip(
        typeof card.card_back != "undefined" &&
          Object.keys(card.card_back).length > 0
      );
    }
  }, [card]);

  return flip ? (
    <FlipCard card={card} />
  ) : (
    <Card name={card?.card_name} image={card?.card_image} />
  );
};

export default SetCardType;
