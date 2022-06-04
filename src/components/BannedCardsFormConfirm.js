import { useState, useEffect, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import ManaCost from "./ManaCost";
import SetIcon from "./SetIcon";
import useGetAllDB from "./useGetAllDB";
import ShowModal from "./ShowModal";
import ViewContext from "./ViewContext";

/* The right side of two forms that allow 
for the addition of new banned cards
*/

//Right Panel of the Banned List Form - Results
const BannedCardsFormConfirm = () => {
  const { card_set, clearAll } = useContext(ViewContext);
  const { getAccessTokenSilently } = useAuth0();

  const [cardlist, setCardlist] = useState(card_set);
  const [settings, setSettings] = useState({
    type: "",
    title: "",
    text: "",
    buttonlayout: "confirm",
    arr: [],
    priority: "primary",
    toggle: false,
    callback: "",
    callback2: "",
  });

  const handleSettings = (text, data, buttonlayout) =>
    setSettings({
      type: "confirm",
      title: "Saving MTG Cards",
      text: text,
      buttonlayout: buttonlayout,
      arr: data,
      priority: "primary",
      toggle: true,
      callback: closeSettings,
      callback2: removeListOfItems,
    });

  const closeSettings = () =>
    setSettings({
      type: "",
      title: "",
      text: "",
      buttonlayout: "confirm",
      arr: [],
      priority: "primary",
      toggle: false,
      callback: closeSettings,
      callback2: "",
    });

  const temp = useGetAllDB(cardlist);
  let setDB = temp[1];
  let cardDB = temp[0];

  //Save and reset form
  const sendCards = () => {
    const setlist = buildSetArray(cardlist, setDB);
    const dupes = findDuplicates(cardlist, cardDB);
    const legacy = findLegacy(cardlist);

    if (legacy.length > 0) {
      const title = "The following cards are Legacy:";
      handleSettings(title, legacy, "confirm");
    } else if (dupes.length > 0) {
      const title = "The following cards are already in database:";
      handleSettings(title, dupes, "confirm");
    } else {
      setStatus();
      const templist = cardlist.data;
      saveSets(setlist);
      saveCollection()
        .then((res) => {
          if (res.status === "Success") {
            const title = "The following cards were entered in the database:";
            handleSettings(title, templist, "dialog");
            setCardlist({ data: [] });
            clearAll();
          } else {
            const title = `The following cards are already in database:`;
            let temp_arr = res.error.split(/"(.*?)"/);
            let bad_arr = [];
            temp_arr.forEach((txt) => {
              let x = templist.findIndex((temp_card) => {
                return temp_card.card_id === txt;
              });
              if (x !== -1) {
                bad_arr.push(templist[x]);
              }
            });
            handleSettings(title, bad_arr, "confirm");
          }
        })
        .catch((e) => {
          const title = ` Critical! Message: ${e.message}`;
          handleSettings(title, [], "dialog");
        });
    }
  };

  //Find illegal cards in user card list
  const findLegacy = (collection) => {
    let arr = collection.data.filter(
      (card) => card.card_legality ==="not_legal" && card.card_set !=="c1c7eb8c-f205-40ab-a609-767cb296544e" &&
      card.card_set !== "d7efccd6-55bc-4fb8-9138-e72577510a99"
    );
    return arr;
  };

  //Find duplicates in upload card list
  const findDuplicates = (collection, cardDB) => {
    let arr = [];
    collection.data.forEach((card) => {
      const x = cardDB.findIndex((db_card) => {
        return db_card.card_id === card.card_id;
      });
      const y = arr.findIndex((funct_card) => {
        return funct_card.card_id === card.card_id;
      });
      if (x > 0 && y < 0) {
        arr.push({
          card_name: card.card_name,
          card_id: card.card_id,
        });
      }
    });

    return arr;
  };

  //Build array of new sets from card selection
  const buildSetArray = (collection, setDB) => {
    let arr = [];
    collection.data.forEach((card) => {
      card.card_version.forEach((ver) => {
        const x = setDB.findIndex((set) => {
          return set.scry_set_id === ver.card_set_id;
        });
        const y = arr.findIndex((set) => {
          return set.scry_set_id === ver.card_set_id;
        });
        if (x < 0 && y < 0) {
          arr.push({
            scry_set_id: ver.card_set_id,
            set_name: ver.card_set_name,
            set_uri: ver.card_set_uri,
            set_release: ver.card_release,
          });
        }
      });
      if (card.card_version.length === 0) {
        arr.push({
          scry_set_id: card.card_set,
          set_name: card.card_setname,
          set_uri: "",
          set_release: card.card_releasee,
        });
      }
    });
    return { data: arr };
  };

  //Save list of MTG Cards
  const saveCollection = async () => {
    const url = "https://mtgmongodbserver.herokuapp.com/auth/addCollection";
    const token = await getAccessTokenSilently();
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
  };

  //Save list of MTG Card Sets
  const saveSets = async (setlist) => {
    const url = "https://mtgmongodbserver.herokuapp.com/auth/addSetList";
    const token = await getAccessTokenSilently();
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
  };

  //Changes MTG card banned status to limited
  const setStatus = () => {
    const items = document.getElementsByTagName("input");
    for (let item of items) {
      let x = cardlist.data.find((card) => card.card_id === item.name);
      if (item.checked) {
        x.card_status = "limited";
      } else {
        x.card_status = "banned";
      }
    }
  };

  //Removes MTG card from user card list
  const removeItem = (card_id) => {
    const list_edit = card_set.data.filter((card) => card.card_id !== card_id);
    setCardlist({ data: list_edit });
  };

  //Remove List of MTG cards from user card list
  const removeListOfItems = (duplicates) => {
    //Extract array of duplicate card ids
    let dupe_ids = duplicates.map((dupes) => {
      return dupes.card_id;
    });
    //Filter those ids form cardlist
    let list_edit = cardlist.data.filter(
      (card) => !dupe_ids.includes(card.card_id)
    );
    //set state list
    setCardlist({ data: list_edit });
    closeSettings();
  };

  //Renders component when user card list is changed.
  useEffect(() => {
    setCardlist(card_set);
  }, [card_set]);

  return (
    <>
      <div className="space_er main__right">
        <h3 className="pb-2"> Confirm Banned Cards: </h3>
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
        <button
          className="mt-3 btn btn-outline-dark btn--mod"
          type="button"
          onClick={sendCards}
        >
          Save Cards
        </button>
      </div>

      <ShowModal settings={settings} />
    </>
  );
};

export default BannedCardsFormConfirm;
