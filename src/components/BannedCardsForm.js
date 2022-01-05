import "../Form.css";
import { useEffect, useState } from "react";

/* Form for the entry of Banned Cards */
const BannedCardsForm = () => {
  const [cardlist, setCardlist] = useState([]);
  const [test, setTest] = useState({
    object: "list",
    not_found: [],
    data: [],
  });

  const buildCardArr = () => {
    const text = document.getElementById("text_area").value;
    let text_list = text.split(/\r?\n/);
    const card_arr = Array.from(text_list, (card) => {
      return { name: card };
    });
    return card_arr;
  };

  useEffect(() => {
    const url = "https://api.scryfall.com/cards/collection";
    const data = {
      identifiers: cardlist,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.object !== "error") {
          setTest(data);
        } else {
          console.log("error:", data);
          setTest({
            object: "error",
            not_found: [],
            data: [],
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [cardlist]);

  return (
    <div className="list-container">
      <div className="list-entry">
        <textarea id="text_area" rows="10" cols="30"></textarea>
        <br />
        <label> Enter Card List </label>
      </div>

      <div>
        <h3> Please confirm card list </h3>
        <ul>
          {test.data.map((card, key) => (
            <li key={key}>{card.name}</li>
          ))}
        </ul>
        <br />
        <button onClick={() => setCardlist(buildCardArr)}>Confirm</button>
      </div>
      {console.log("end of render")}
    </div>
  );
};

export default BannedCardsForm;
