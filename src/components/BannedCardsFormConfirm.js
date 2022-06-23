import { useState, useEffect, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  removeListOfItems,
  buildSetArray,
  saveCollection,
  saveSets,
  findDuplicates,
  findLegacy,
  CardListDisplay,
} from "./UploadFunctions";

import ShowModal from "./ShowModal";
import ViewContext from "./ViewContext";

/* The right side of two forms that allow 
for the addition of new banned cards
*/

//Right Panel of the Banned List Form - Results
const BannedCardsFormConfirm = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { card_set } = useContext(ViewContext);
  const [cardlist, setCardlist] = useState(card_set);
  const [settings, setSettings] = useState({
    type: "",
    title: "",
    text: "",
    data: [],
    toggle: false,
  });

  const closeSettings = () =>
    setSettings({
      type: "",
      title: "",
      text: "",
      data: [],
      toggle: false,
    });

  //Save and reset form
  const sendCards = async () => {
    if (cardlist.data.length === 0) {
      console.log(cardlist.data);
      return;
    }

    const dupes = await findDuplicates(cardlist);
    const legacy = await findLegacy(cardlist);

    if (legacy.length > 0) {
      const temp = removeListOfItems(legacy, cardlist);
      setSettings({
        type: "alert",
        title: "Cleaver MTG Banned List",
        text: "The following cards were removed. Reason: Legacy",
        data: legacy,
        toggle: true,
      });
      setCardlist(temp);
      return;
    }

    if (dupes.length > 0) {
      const temp = removeListOfItems(dupes, cardlist);
      setSettings({
        type: "alert",
        title: "Cleaver MTG Banned List",
        text: "The following cards were removed. Reason: Cards are already Banned",
        data: dupes,
        toggle: true,
      });
      setCardlist(temp);
      return;
    }

    let templist = cardlist.data;

    localStorage.setItem("Update",true);

    const setlist = await buildSetArray(cardlist);

    const setRes = await saveSets(setlist, getAccessTokenSilently);

    console.log(setRes);

    const cardRes = await saveCollection(cardlist, getAccessTokenSilently);

    if (cardRes.status === "Success") {
      setSettings({
        type: "alert",
        title: "Cleaver MTG Banned List",
        text: "The following cards were entered in the database:",
        data: templist,
        toggle: true,
      });

      setCardlist({ data: [] });
    } else {
      let temp_arr = cardRes.error.split(/"(.*?)"/);
      let bad_arr = [];
      temp_arr.forEach((txt) => {
        let x = templist.findIndex((temp_card) => {
          return temp_card.card_id === txt;
        });
        if (x !== -1) {
          bad_arr.push(templist[x]);
        }
      });

      setSettings({
        type: "alert",
        title: "Cleaver MTG Banned List",
        text: "The following cards are already in database:",
        data: bad_arr,
        toggle: true,
      });
    }
  };

  //Renders component when user card list is changed.
  useEffect(() => {
    setCardlist(card_set);
  }, [card_set]);

  return (
    <>
      <div className="space_er main__right">
        <h3 className="pb-2"> Confirm Banned Cards: </h3>

        <CardListDisplay cardlist={cardlist} setCardlist={setCardlist} />

        <button
          className="mt-3 btn btn-outline-dark btn--mod"
          type="button"
          onClick={sendCards}
        >
          Save Cards
        </button>
      </div>

      <ShowModal
        settings={settings}
        show={null}
        type={"alert"}
        funct={closeSettings}
      />
    </>
  );
};

export default BannedCardsFormConfirm;
