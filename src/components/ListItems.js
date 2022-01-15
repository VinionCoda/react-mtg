import ManaCost from "./ManaCost";
const ListItems = (props) => { 
const {setlist, getCard} = props;

  return (
    <ul className="list-group setlist">
      <a
        href="#lsit"
        className="list-group-item list-group-item-action active"
        aria-current="true"
      >
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{setlist.setname}</h5>
        </div>
      </a>
      {setlist.limited.map((card) => (
        <a
          key={card.card_id}
          href={`#${card.card_id}`}
          onClick={()=>getCard(card)}
          className="list-group-item list-group-item-action"
          aria-current="true"
        >
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{card.card_name}</h5>
            <small>
              <ManaCost mana_cost={card.card_cost} />
            </small>
          </div>
          <span className={`set_icon ${card.rarity_css}`}  style={setlist.set_svg}></span> &nbsp; &nbsp;
          <span className="mb-1"> {card.card_type}</span> &nbsp; &nbsp;
          <small className={card.card_status}>{card.card_status}</small>
        </a>
      ))}
      {setlist.banned.map((card) => (
        <a
          key={card.card_id}
          href={`#${card.card_id}`}
          onClick={()=>getCard(card)}
          className="list-group-item list-group-item-action"
          aria-current="true"
        >
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{card.card_name}</h5>
            <small>
              <ManaCost mana_cost={card.card_cost} />
            </small>
          </div>
          <span className={`set_icon ${card.rarity_css}`} style={setlist.set_svg}></span> &nbsp; &nbsp;
          <span className="mb-1"> {card.card_type}</span> &nbsp; &nbsp;
          <small className={card.card_status}>{card.card_status}</small>
        </a>
      ))}
    </ul>
  );
};

export default ListItems;
