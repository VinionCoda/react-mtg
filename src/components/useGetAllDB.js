import { useEffect, useState } from "react";

const useGetAllDB = (refresh) => {
  const [viewlist, setViewList] = useState([]);

  const fetchCards = async () => {
    const data = await fetch("https://mtgmongodbserver.herokuapp.com/cards");
    const res = await data.json();
    return res;
  };

  const fetchSets = async () => {
    const data = await fetch("https://mtgmongodbserver.herokuapp.com/sets");
    const res = await data.json();
    return res;
  };

  const cardlist = viewlist.length > 0 ? viewlist[0] : [];
  const setlist = viewlist.length > 0 ? viewlist[1] : [];

  useEffect(() => {
    const promises = [];

    promises.push(fetchCards());
    promises.push(fetchSets());

    Promise.all(promises).then((results) => {
      setViewList(results);

    });
  }, [refresh]);

  console.log("buildview is repeating");

  return [cardlist, setlist ];
};

export default useGetAllDB;
