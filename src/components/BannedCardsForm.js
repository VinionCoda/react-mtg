
import { useState } from "react";
import useFormSetBuilder from "./useFormSetBuilder";
import useGetCardsByCollection from "./useGetCardsByCollection";
import BannedCardsFormRight from "./BannedCardsFormRight";

/* Form for the entry of Banned Cards */
const BannedCardsForm = () => {
  const [cardlist, setCardlist] = useState([]);

  const buildCardArr = () => {
    const text = document.getElementById("text_area").value;
    let temp_arr = text.split(/\r?\n/);
    const text_list = temp_arr.filter((card) => card !== "");
    const card_arr = Array.from(text_list, (card) => {
      return { name: card };
    });
    return card_arr;
  };

  const clearAll = () => {
    document.getElementById("text_area").value = "";
   setCardlist([{name:"text"}]);
  };


  const collection = useGetCardsByCollection(cardlist);
  const card_set = useFormSetBuilder(collection);

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
          className="btn btn-outline-dark"
          onClick={() => {
            setCardlist(buildCardArr);
          }}
        >
          Load List
        </button>
        &nbsp;&nbsp;&nbsp;
        <button
          className="btn btn-outline-dark "
          onClick={() => {
            clearAll();
          }}
        >
          Clear All
        </button>
      </div>
      <hr className="hr_line" />

      
      <BannedCardsFormRight card_set ={card_set} />


    </div>
  );
};

export default BannedCardsForm;
