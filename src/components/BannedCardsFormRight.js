
import { useState , useEffect} from "react";
import ManaCost from "./ManaCost";

const BannedCardsFormRight = ({card_set}) => {
    const [cardlist, setCardlist] = useState({data:[]});
    
    const setStatus = () => {
        const items = document.getElementsByTagName("input");
        for (let item of items) {
          let x = card_set.data.find((card) => card.card_id === item.name);
          if (item.checked) {
            x.card_status = "limited";
          } else {
            x.card_status = "banned";
          }
        }
        console.log(card_set);
      };

      useEffect(() => {         
        setCardlist(card_set)
      }, [card_set])
    

    return (
        <div className="space_er main__right">
        <h3 className="pb-2"> Confirm Banned Cards: </h3>
        <div id="card_list" className="list-group list__banned">
          {cardlist.data.map((card, key) => (
            <a
              href={`#${card.card_id}`}
              className="list-group-item list-group-item-action"
              aria-current="true"
              key={key}
            >
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1 text-start">
                  {card.dual_card_name !== ""
                    ? card.dual_card_name
                    : card.card_name}
                </h5>
                <small className="w-50">
                  <ManaCost mana_cost={card.card_cost} />
                </small>
              </div>
              <p className="mb-1 text-start">{card.card_type}</p>
              <p className="mb-1 text-start">{card.card_rarity}</p>
              <div className="form-check text-start">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="defaultCheck1"
                  name={card.card_id}
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                  Limited
                </label>
              </div>
            </a>
          ))}
        </div>
        <button
          className="mt-3 btn btn-outline-dark"
          type="button"
          onClick={() => setStatus()}
        >
          Save Cards
        </button>
      </div>
    )
}

export default BannedCardsFormRight
