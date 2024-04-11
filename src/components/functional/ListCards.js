import { useContext, Fragment } from "react";
import Card from "./Card";
import FlipCard from "./FlipCard";
import ViewContext from "./ViewContext";
import "../../CardView.css";

//Renders Dataset as viewable cards arranged by set
const ListCards = () => {
  const setlist = useContext(ViewContext);

  if (setlist.length === 0)
    return (
      <>
        <span className="container--loading"></span>
        <h2 className="container--text">Loading</h2>
      </>
    );

  return (
    <>
      <h3 className="container__heading ">List of Banned Cards</h3>
      <hr></hr>
      {setlist.map((set) => (
        <Fragment key={set.set_id}>
          <div className="container--name" id={set.set_id}>
            <h3 className="setname--card" > {set.setname} </h3>
            <div className="container--card" >
              {set.banned.map((card, key) =>
                card.dual_card_name === "" ? (
                  <Card card={card} />
                ) : (
                  <FlipCard card={card} />
                )
              )}
            </div>
            <hr />
          </div>
        </Fragment>
      ))}
    </>
  );
};

export default ListCards;
