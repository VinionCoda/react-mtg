
import Card from "./Card";
import FlipCard from "./FlipCard";
import { useState, useEffect } from "react";

/* Generates either a regular card or a Flip Card */
const SetCardType = ({ card, showCard }) => {
  const [flip, setFlip] = useState(false);

  useEffect(() => {


    
   if(Object.keys(card).length > 0){    
    setFlip((typeof card.card_back != "undefined") && (Object.keys(card.card_back).length > 0))
    showCard();

   }
   
  }, [card]);

  return flip ? (
    <FlipCard card={card} />
  ) : (
    <Card name={card?.card_name} image={card?.card_image} />
  );
};

export default SetCardType;
