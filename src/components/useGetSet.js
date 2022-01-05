import { useState, useEffect } from "react";

/* Returns a Set Object */
const useGetSet = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const url = "https://api.scryfall.com/sets/" + id;

  useEffect(() => {
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
  }, [url, setData]);

  return [data, loading];
};

export default useGetSet;
