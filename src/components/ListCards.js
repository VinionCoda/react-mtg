import React from "react";
import Card from "./Card";
import FlipCard from "./FlipCard";
import "../CardView.css";

const ListCards = (props) => {
  const { setlist } = props;

  return (
    <>
     
        {setlist[0].banned.map((card, key) => card.dual_card_name=="" ? <Card card={card}/> : <FlipCard card={card}/>
            


        )}

    </>
  );
};

export default ListCards;
