import Card from "./Card";
import FlipCard from "./FlipCard";
import Accordion from "react-bootstrap/Accordion";
import "../CardView.css";

const ListCards = (props) => {
  const { setlist } = props;

  return (
    <>
      <Accordion defaultActiveKey="0" className="w-100">
        {setlist.map((set, key) => { return (
          <Accordion.Item eventKey={`${ key }`}>
            <Accordion.Header> {set.setname}</Accordion.Header>
            <Accordion.Body className="container--card">
              {set.banned.map((card, key) =>
                card.dual_card_name === "" ? (
                  <Card card={card} />
                ) : (
                  <FlipCard card={card} />
                )
              )}
              {set.limited.map((card, key) =>
                card.dual_card_name === "" ? (
                  <Card card={card} />
                ) : (
                  <FlipCard card={card} />
                )
              )}
            </Accordion.Body>
          </Accordion.Item>
        )})}
      </Accordion>        
    </>
  );
};

export default ListCards;
