import { useState } from "react";
import useBuildCardData from "./useBuildCardData";
import useGetCardsByCollection from "./useGetCardsByCollection";
import BannedCardsFormRight from "./BannedCardsFormRight";
import useGetCardVersion from "./useGetCardVersion";

/* Form for the entry of Banned Cards */
const BannedCardsForm = () => {
  const [cardlist, setCardlist] = useState([]);

  //Returns a formatted array of card objects
  const buildCardArr = () => {
    const text = document.getElementById("text_area").value;
    let temp_arr = text.split(/\r?\n/);
    const text_list = temp_arr.filter((card) => card !== "");
    const card_arr = Array.from(text_list, (card) => {
      return { name: card };
    });
    return card_arr;
  };

  //clear the contents of text area
  const clearAll = () => {
    document.getElementById("text_area").value = "";
    setCardlist([{ name: "text" }]);
  };

  //build card object collection from remote api
  const collection = useGetCardsByCollection(cardlist);

  //rebuild card object collection using date released
  const rebuild = useGetCardVersion(collection);

  //create new formated card object array
  const card_set = useBuildCardData(rebuild);

  return (
    <div className="ml-5 w-100">
      <div className="main__left">
        <label htmlFor="text_area" className="fs-3">
          Enter Banned Cards:
        </label>
        <textarea
          className="form-control mt-3 mb-4"
          id="text_area"
          rows="10"
        ></textarea>
        <button
          className="btn btn-outline-dark btn--mod"
          onClick={() => {
            setCardlist(buildCardArr);
          }}
        >
          Load List
        </button>
        &nbsp;&nbsp;&nbsp;
        <button
          className="btn btn-outline-dark btn--mod "
          onClick={() => {
            clearAll();
          }}
        >
          Clear All
        </button>
      </div>
      <hr className="hr_line" />
      {/* Right side panel inserted here */}
      <BannedCardsFormRight card_set={card_set} callback={clearAll} />
    </div>
  );
};

export default BannedCardsForm;
