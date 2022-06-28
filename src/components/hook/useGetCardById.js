import { useState, useEffect } from "react";

/* returns a Card Object */
function useGetCardById(card_id) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = "https://api.scryfall.com/cards/" + card_id;
    fetch(url)
      .then((response) => {       
          return response.json();
      })
      .then((data) => {
        setData(data);
      })
      
  }, [card_id]);

  return data;
}

export default useGetCardById;
