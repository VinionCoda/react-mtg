import { useEffect, useState } from "react";

const useGetAllDB = (refresh) => {
  const [viewlist, setViewList] = useState([]);

  const fetchCards = async () => {
    try {
      const data = await fetch("https://mtgmongodbserver.herokuapp.com/cards");
      const res = await data.json();
      return res;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const fetchSets = async () => {
    try {
    const data = await fetch("https://mtgmongodbserver.herokuapp.com/sets");
    const res = await data.json();
    return res;
    } catch (error) {
      console.log(error);
      return [];
    }    
  };

  useEffect(() => {
    const promises = [];
    promises.push(fetchCards());
    promises.push(fetchSets());
    Promise.all(promises).then((results) => {
      setViewList(results);
    });
  }, [refresh]);

  console.log("buildview is repeating");
  return viewlist;
};

export default useGetAllDB;
