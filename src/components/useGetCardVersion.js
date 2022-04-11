import { useState, useEffect } from "react";

const useGetCardVersion = (collection) => {
  const [state, setState] = useState({
    object: "list",
    not_found: [],
    data: [],
  });

  const [arr, setArr] = useState([]);

  useEffect(() => {
    const fetchData = (card) => {
      return fetch(card.prints_search_uri)
        .then((data) => {
          return data.json();
        })
        .then((res) => {
          const t = res.data.reduce((pr, cr) =>
            pr.released_at < cr.released_at ? pr : cr
          );

          let a = arr;
          a.push(t);
          setArr(a);
        });
    };

    for (var card in collection.data) {
      fetchData(collection.data[card]);
    }

    setState({
      object: "list",
      not_found: collection.not_found,
      data: arr,
    });

  }, [collection, arr]);

  return state;
};

export default useGetCardVersion;
