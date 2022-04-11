import "../Form.css";
import { useState, useEffect } from "react";
import ManaCost from "./ManaCost";
import SetIcon from "./SetIcon";
import SetCardType from "./SetCardType";

/* The right side of two forms that allow 
for the addition of new banned cards
*/

//Right Panel of the Banned List Form - Results
const BannedCardsFormRight = ({ card_set }) => {
  const [cardlist, setCardlist] = useState({ data: [] });
  const [showCard, setShowCard] = useState({});

  //adjusts card status property based on checkbox
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
    saveCollection();
  };

  //Save confirmed cards
  const saveCollection = () => {
    const url = "http://192.168.0.3:5000/cards/addCollection";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(card_set),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  //Toggle Modal
  const showModal = (card) => {
    document.getElementById("displayCard").style.display = "block";
    setShowCard(card);
  };
  const hideModal = () => {
    document.getElementById("displayCard").style.display = "none";
    setShowCard({});
  };

  //modifies component on change to card_set object
  useEffect(() => {
    setCardlist(card_set);
  }, [card_set]);

  return (
    <>
      <div className="space_er main__right">
        <h3 className="pb-2"> Confirm Banned Cards: </h3>
        <div id="card_list" className="list-group list__banned">
          {cardlist.data.map((card, key) => (
            <a
              href={`#${card.card_id}`}
              className="list-group-item list-group-item-action"
              aria-current="true"
              key={key}
              onClick={() => {
                showModal(card);
              }}
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

      <div
        className="modal"
        id="displayCard"
        aria-labelledby="displayCard"
        aria-hidden="true"
      >
        <div className="modal-dialog content_size">
          <div className="modal-content block_content">
            <div className="modal-body text-center">
              <SetCardType card={showCard} />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => hideModal()}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BannedCardsFormRight;
