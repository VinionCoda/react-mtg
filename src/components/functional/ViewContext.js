import { createContext } from "react";

/* FUNCTIONS FOR THE CREATION OF VIEW DATASET. CONTEXT PASSES DATASET TO CHILDNODES */


//Gathers MTG cards from MongoDB via Heroku API server
const fetchCards = async () => {
  try {
    //const data = await fetch("https://mtgmongodbserver.herokuapp.com/cards");
    const data = await fetch("https://club-api.onrender.com/cards");
    const res = await data.json();
    return res;
  } catch (error) {
    console.log(error);
    return [];
  }
};

//Gathers MTG Sets from MongoDB via Heroku API server
const fetchSets = async () => {
  try {
   // const data = await fetch("https://mtgmongodbserver.herokuapp.com/sets");
   const data = await fetch("https://club-api.onrender.com/sets");
    const res = await data.json();
    return res;
  } catch (error) {
    console.log(error);
    return [];
  }
};


//Sorts and builds Dataset for View
export const buildViewData = async () => {
  const cardDB = await fetchCards();
  const setDB = await fetchSets();

  const remEmptySets = setDB.filter((set) => set.scry_set_id !== "undefined");

  const sort_cards =
    cardDB.length > 0
      ? cardDB.sort((a, b) => a.card_name.localeCompare(b.card_name)? 1 : -1)
      : [];
  const sort_sets =
  remEmptySets.length > 0 ? setDB.sort((a, b) => a.set_release > b.set_release? 1 : -1) : [];

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
