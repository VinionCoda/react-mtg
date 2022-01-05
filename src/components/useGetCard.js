import { useState, useEffect } from "react";

/* returns a Card Object */
function useGetCard(card) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);  

  useEffect(() => {
    const url = "https://api.scryfall.com/cards/named?fuzzy=" + card;

    setLoading(true);
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [card]);

  return [data, loading];
}

export default useGetCard;
