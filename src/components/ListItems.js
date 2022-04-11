import ManaCost from "./ManaCost";
import SetIcon from "./SetIcon";

const ListItems = (props) => {
  const { setlist } = props;

  return (
    <>
      <div className="space_er main__right">
        {/* Begining of Banned List View */}
        <div id="card_list" className="list-group list__banned">
          {/* Set Name and Set Icon*/}
          <div class="d-flex w-100 list-group-item justify-content-between set_title">
            <h5 class="mb-1">{setlist[0].setname}</h5>
            <small className="d-flex w-25  text-end">
              <SetIcon set_id={setlist[0].set_id} css={"set_icon--uncommon"} />
            </small>
          </div>
          {setlist[0].banned.map((card, key) => (
            <a
              href={`#${card.card_id}`}
              className="list-group-item list-group-item-action"
              aria-current="true"
              key={key}
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

            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListItems;
