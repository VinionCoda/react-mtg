import { useState } from "react";
import { TextArea } from "./UploadFunctions";

import BannedCardsFormConfirm from "./BannedCardsFormConfirm";
import ViewContext from "./ViewContext";
import useBuildCardData from "./useBuildCardData";

/* Form for the entry of Banned Cards */
const BannedCardsForm = () => {
  const [cardlist, setCardlist] = useState([]);

  //create new formated card object array
  const card_set = useBuildCardData(cardlist);
  const options = {card_set};

  return (
    <div className="ml-5 w-100">
      <div className="main__left">
        <label htmlFor="text_area" className="fs-3">
          Enter Banned Cards:
        </label>
        <TextArea setState={setCardlist} />
      </div>
      <hr className="hr_line" />
      {/* Right side panel inserted here */}
      <ViewContext.Provider value={options}>
        <BannedCardsFormConfirm />
      </ViewContext.Provider>
    </div>
  );
};

export default BannedCardsForm;
