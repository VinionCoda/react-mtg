import { useRef } from "react";
import ManaCost from "./ManaCost";
import SetIcon from "./SetIcon";

/*  A GROUP OF FUNCTIONS RELATED TO THE ADDITION AND REMOVAL OF BANNED CARDS  */

//Fetch Card DB
const fetchCards = async () => {
  try {//https://mtgmongodbserver.herokuapp.com/
    //const data = await fetch("http://localhost:5000/cards");
    const data = await fetch("https://club-api.onrender.com/cards");
    const res = await data.json();
    return res;
  } catch (error) {
    return { status: "Failed", error: error.message };
  }
};

//Fetch Set DB
const fetchSets = async () => {
  try {
    //const data = await fetch("http://localhost:5000/sets");
    const data = await fetch("https://club-api.onrender.com/sets");
    const res = await data.json();
    return res;
  } catch (error) {
    return { status: "Failed", error: error.message };
  }
};

//Delete card from database
export const removeMTGCard = async (card, callback) => {
  try {
    //console.log(card);
    const token = await callback();
    const url = "https://club-api.onrender.com/auth/removeCard";
    //const url = "http://localhost:5000/auth/removeCard";
    const requestOptions = {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(card[0]),
    };

    const data = await fetch(url, requestOptions);
    const dataJson = await data.json();
    //console.log(dataJson);
    return dataJson;
  } catch (error) {
    //console.log(error);
    return { status: "failed" };
  }
};

export const fetchAndSortCardDB = async () => {
  const temp = await fetchCards();

  const temp_sort = temp.sort((a, b) =>
    a.card_name.localeCompare(b.card_name) ? 1 : -1
  );

  return temp_sort;
};

//clear the contents of text area
export const clearAll = (setCardlist) => {
  document.getElementById("text_area").value = "";
  setCardlist([{ name: "text" }]);
};

export const TextArea = ({ setState }) => {
  const buildCardArr = (text) => {
    let temp_arr = text.split(/\r?\n/);
    const text_list = temp_arr.filter((card) => /\S/.test(card));
    const card_arr = Array.from(text_list, (card) => {
      return { name: card };
    });
    return card_arr;
  };

  const txtArea = useRef(null);
  const saveText = () => {
    setState(buildCardArr(txtArea.current.value));
  };
  const clearText = () => {
    txtArea.current.value = "";
    setState([]);
  };

  return (
    <>
      <textarea
        className="form-control mt-3 mb-4"
        ref={txtArea}
        rows="10"
      ></textarea>{" "}
      <button className="btn btn-outline-dark btn--mod" onClick={saveText}>
        Load List
      </button>
      &nbsp;&nbsp;&nbsp;
      <button className="btn btn-outline-dark btn--mod " onClick={clearText}>
        Clear All
      </button>
    </>
  );
};

//Find illegal cards in user card list
export const findLegacy = (collection) => {
  let arr = collection.data.filter(
    (card) =>
      card.card_legality === "not_legal" &&
      card.card_set !== "c1c7eb8c-f205-40ab-a609-767cb296544e" &&
      card.card_set !== "d7efccd6-55bc-4fb8-9138-e72577510a99"
  );
  return arr;
};

//Find duplicates in upload card list
export const findDuplicates = async (collection) => {
  const cardDB = await fetchCards();
  //console.log(cardDB);
  let arr = [];
  collection.data.forEach((card) => {
    const x = cardDB.findIndex((db_card) => {
      return db_card.card_id === card.card_id;
    });
    const y = arr.findIndex((funct_card) => {
      return funct_card.card_id === card.card_id;
    });
    if (x > -1 && y < 0) {
      arr.push({
        card_name: card.card_name,
        card_id: card.card_id,
      });
    }
  });

  return arr;
};

//Build array of new sets from card selection
export const buildSetArray = async (collection) => {
  const setDB = await fetchSets();
  let arr = [];

  collection.data.forEach((card) => {
    const x = setDB.findIndex((set) => {
      return set.scry_set_id === card.card_set;
    });

    const y = arr.findIndex((set) => {
      return set.scry_set_id === card.card_set;
    });

    if (x < 0 && y < 0) {
      arr.push({
        scry_set_id: card.card_set,
        set_name: card.card_setname,
        set_uri: card.card_set_uri,
        set_release: card.card_release,
      });
    }
  });

  return { data: arr };
};

//Changes MTG card banned status to limited
export const setStatus = (cardlist) => {
  const items = document.getElementsByTagName("input");
  for (let item of items) {
    let x = cardlist.data.find((card) => card.card_id === item.name);
    if (item.checked) {
      x.card_status = "limited";
    } else {
      x.card_status = "banned";
    }
  }
  return cardlist;
};

//Save list of MTG Cards
export const saveCollection = async (cardlist, callback) => {
  try {
    const token = await callback();
    const url = "https://club-api.onrender.com/auth/addCollection";
    //const url = "http://localhost:5000/auth/addCollection";
    const requestOptions = {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cardlist),
    };

    const data = await fetch(url, requestOptions);
    const dataJson = await data.json();
    return dataJson;
  } catch (error) {
    //console.log(error);
    return { status: "failed" };
  }
};

//Save list of MTG Card Sets
export const saveSets = async (setlist, callback) => {
  try {
    const token = await callback();
    const url = "https://club-api.onrender.com/auth/addSetList";
    //const url = "http://localhost:5000/auth/addSetList";
    const requestOptions = {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(setlist),
    };
    const data = await fetch(url, requestOptions);
    const dataJson = await data.json();
    return dataJson;
  } catch (error) {
    //console.log(error);
    return { status: "failed" };
  }
};

//Remove List of MTG cards from user card list
export const removeListOfItems = (collection, cardlist) => {
  //Extract array of collection card ids
  let collection_ids = collection.map((card) => {
    return card.card_id;
  });
  //Filter those ids form cardlist
  let list_edit = cardlist.data.filter(
    (card) => !collection_ids.includes(card.card_id)
  );
  //return cardlist
  return {
    object: "list",
    not_found: [],
    data: list_edit,
  };
};

export const CardListDisplay = ({ cardlist, setCardlist }) => {
  //Removes MTG card from user card list
  const removeItem = (card_id) => {
    const list_edit = cardlist.data.filter((card) => card.card_id !== card_id);
    setCardlist({ data: list_edit });
  };

  return (
    <div id="card_list" className="list-group list__banned list--mod">
      {cardlist.data.map((card, key) => (
        <a
          href={`#${card.card_id}`}
          className="list-group-item list-group-item-action"
          aria-current="true"
          key={key}
        >
          <div className="d-flex w-100 ">
            <SetIcon set_id={card.card_set} css={card.rarity_css} />
            <h5 className="mb-1 text-start card_name--mod">
              {card.dual_card_name !== ""
                ? card.dual_card_name
                : card.card_name}
            </h5>

            <small className="w-50 float-end">
              <ManaCost mana_cost={card.card_cost} />
            </small>
          </div>
          <div className="line--mod">
            <span className="">{card.card_type}</span>
            <span className="">{card.card_setname}</span>
          </div>

          <div className="form-check line--right chk_btn">
            <div>
              <label className="form-check-label  " htmlFor="defaultCheck1">
                Limited
              </label>
              {"  "}{" "}
              <input
                className="form-check-input float-end"
                type="checkbox"
                id="defaultCheck1"
                name={card.card_id}
              />
            </div>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => {
                removeItem(card.card_id);
              }}
            >
              Remove
            </button>
          </div>
        </a>
      ))}
    </div>
  );
};

export const CardListRemove = ({ cardlist, callback }) => {

  return (
    <div id="card_list" className="list-group list__banned list--mod">
      {cardlist.map((card, key) => (
        <a
          href={`#${card.card_id}`}
          className="list-group-item list-group-item-action"
          aria-current="true"
          key={key}
        >
          <div className="d-flex w-100 ">
            <SetIcon set_id={card.card_set} css={card.rarity_css} />
            <h5 className="mb-1 text-start card_name--mod">
              {card.dual_card_name !== ""
                ? card.dual_card_name
                : card.card_name}
            </h5>

            <small className="w-50 float-end">
              <ManaCost mana_cost={card.card_cost} />
            </small>
          </div>
          <div className="line--mod">
            <span className="">{card.card_type}</span>
            <span className="">{card.card_setname}</span>
          </div>

          <div className="form-check line--right chk_btn">
            <div>
              <label className="form-check-label  " htmlFor="defaultCheck1">
                Limited
              </label>
              {"  "}{" "}
              <input
                className="form-check-input float-end"
                type="checkbox"
                id="defaultCheck1"
                name={card.card_id}
              />
            </div>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => {
                //console.log(card.card_id);
                callback(card);
              }}
            >
              Remove
            </button>
          </div>
        </a>
      ))}
    </div>
  );
};

const UploadFunctions = () => {
  return <></>;
};

export default UploadFunctions;
