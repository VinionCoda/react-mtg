import { useState, useEffect } from "react";

const useGetCardVersion = (collection) => {
  const [state, setState] = useState({
    object: "list",
    not_found: [],
    data: [],
  });

  useEffect(() => {
    const promises = [];
    const fetchData = async (card) => {
      const data = await fetch(card.prints_search_uri);
      const res = await data.json();
      card.version = res.data;
      return card;
    };

    for (var card in collection.data) {
      promises.push(fetchData(collection.data[card]));
    }

    Promise.all(promises).then((results) => {
      setState({
        object: "list",
        not_found: collection.not_found,
        data: results,
      });
    });
  }, [collection]);

  return state;
};

export default useGetCardVersion;
