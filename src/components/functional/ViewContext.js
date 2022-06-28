import { createContext } from "react";

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

export const buildViewData = async () => {
  const cardDB = await fetchCards();
  const setDB = await fetchSets();

  const remEmptySets = setDB.filter((set) => set.scry_set_id !== "undefined");

  const sort_cards =
    cardDB.length > 0
      ? cardDB.sort((a, b) => a.card_name.localeCompare(b.card_name))
      : [];
  const sort_sets =
  remEmptySets.length > 0 ? setDB.sort((a, b) => a.set_release > b.set_release) : [];

  const rebuild = sort_sets.map((set) => {
    return {
      set_id: set.scry_set_id,
      setname: set.set_name,
      banned: sort_cards.filter((card) => card.card_set === set.scry_set_id),
      limited: [],
    };
  });
  return rebuild;
};

const ViewContext = createContext();
export default ViewContext;
