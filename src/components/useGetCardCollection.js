import { useState, useEffect } from "react";

/* Returns and array of card objects */
const useGetCardCollection = (cardlist) => {
  const [test, setTest] = useState({
    object: "list",
    not_found: [],
    data: [],
  });

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

  return test;
};

export default useGetCardCollection;
