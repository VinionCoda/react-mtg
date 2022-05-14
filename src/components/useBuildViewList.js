import useGetSetDB from "./useGetSetDB";
import useGetCardDB from "./useGetCardDB";
//import { useEffect, useState } from "react";

const useBuildViewList = () => {
  // const [state, setState] = useState([]);
  // const [viewlist, setViewList] = useState([]);

  const promises = [];

  const cardlist = "";

  promises.push(useGetSetDB());
  promises.push(useGetCardDB());

  const setlist = useGetSetDB().sort((a, b) => a.set_release > b.set_release);

  const tempList = setlist.map((set) => {
    let arr = [];

    cardlist.forEach((card) => {
      if (card.card_set === set.scry_set_id) {
        arr.push(card);
        console.log(` array push  ${card.card_name}`);
      }
    });

    console.log(" send to main array");
    return {
      setname: set.set_name,
      set_id: set.scry_set_id,
      banned: arr,
    };
  });

  return tempList;
};

export default useBuildViewList;
