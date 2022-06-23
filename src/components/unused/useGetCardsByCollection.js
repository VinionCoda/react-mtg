import { useState, useEffect } from "react";

/* Returns and array of card objects */
const useGetCardsByCollection = (cardlist) => {
  const [test, setTest] = useState({
    object: "list",
    not_found: [],
    data: [],
    error: "first_run",
  });

  useEffect(() => {
    if (Object.keys(cardlist).length > 0) {
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
            data.error = "";
            setTest(data);
          } else {
            throw data;
          }
        })
        .catch((err) => {
          console.log(err);
          setTest({
            object: "error",
            not_found: [],
            data: [],
            error: err,
          });
        });
    }
  }, [cardlist]);

  return test;
};

export default useGetCardsByCollection;
