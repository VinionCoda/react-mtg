import { useContext } from "react";
import ManaCost from "./ManaCost";
import SetIcon from "./SetIcon";
import Accordion from "react-bootstrap/Accordion";
import ViewContext from "./ViewContext";
import "../../CardView.css";


//Renders Dataset as collapsable lists of cards arranged by set
const ListItems = () => {
  const setlist = useContext(ViewContext);

  return (
    <>
      <Accordion  className="w-100 mobile_list">
        {setlist.map((set, key) => {
          return (
            <Accordion.Item eventKey={`${ key }`}>        
              <Accordion.Header> {set.setname}</Accordion.Header>
              <Accordion.Body className="container--card">
                <div id="card_list" className="list-group list__banned">
                  {set.banned.map((card, key) => (
                    <a
                      href={`#${card.card_id}`}
                      className="list-group-item list-group-item-action"
                      aria-current="true"
                      key={`${card.card_id}`}
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <SetIcon set_id={card.card_set} css={card.rarity_css} />
                        <h5 className="mb-1 text-start card_name--mod">
                          {card.dual_card_name !== ""
                            ? card.dual_card_name
                            : card.card_name}
                        </h5>
                        <small className="w-50">
                          <ManaCost mana_cost={card.card_cost} />
                        </small>
                      </div>
                      <span className="mb-1 text-start card_type--mod">
                        {card.card_type}
                      </span>
                      <div className="form-check text-start chk_btn">
                        <label
                          className="form-check-label"
                          htmlFor="defaultCheck1"
                        >
                          Stutus:
                        </label>{" "}
                        &nbsp;
                        <span>{card.card_status}</span>
                      </div>
                    </a>
                  ))}
                  {set.limited.map((card, key) => (
                    <a
                      href={`#${card.card_id}`}
                      className="list-group-item list-group-item-action"
                      aria-current="true"
                      key={`${ key }`}
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <SetIcon set_id={card.card_set} css={card.rarity_css} />
                        <h5 className="mb-1 text-start card_name--mod">
                          {card.dual_card_name !== ""
                            ? card.dual_card_name
                            : card.card_name}
                        </h5>
                        <small className="w-50">
                          <ManaCost mana_cost={card.card_cost} />
                        </small>
                      </div>
                      <span className="mb-1 text-start card_type--mod">
                        {card.card_type}
                      </span>
                      <div className="form-check text-start chk_btn">
                        <label
                          className="form-check-label"
                          htmlFor="defaultCheck1"
                        >
                          Status:
                        </label>{" "}
                        &nbsp;
                        <span>{card.card_status}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </>
  );
};

export default ListItems;
