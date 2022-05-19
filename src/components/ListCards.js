import Card from "./Card";
import FlipCard from "./FlipCard";
import Accordion from "react-bootstrap/Accordion";
import { useEffect, useState } from "react";
import "../CardView.css";

const ListCards = ({ setlist }) => {
  const [setList, setSetList] = useState([]);

  useEffect(() => {
    setSetList(setlist);
  },[setlist]);

  return (
    <>
      <Accordion defaultActiveKey="0" className="w-100">
        {setList.map((set, key) => {
          return (
            <Accordion.Item eventKey={`${key}`}>
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
          );
        })}
      </Accordion>
    </>
  );
};

export default ListCards;
