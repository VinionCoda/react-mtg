import ManaCost from "./ManaCost";


import useGetCardCollection from "./useGetCardCollection";

/* Generates an unordered list of banned card from a set */
const SetList = ({ cardlist }) => {
  const list = useGetCardCollection(cardlist);

  return (
    <ul className="list-group">
      <li key="222" className="list-group-item setname"> Set Name </li>
      {list.data.map((card) => (
        <li key={card.id} className="list-group-item" >
          {card.name} &nbsp; <ManaCost mana_cost={card.mana_cost} />
        </li>
      ))}
    </ul>
  );
};

export default SetList;
