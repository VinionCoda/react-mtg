import { useEffect, useState } from "react";

const useBuildViewList = (data) => {
  const [state, setState] = useState([]);

  const sort_cards =
    state.length > 0
      ? state[0].sort((a, b) => a.card_name.localeCompare(b.card_name))
      : [];
  const sort_sets =
    state.length > 0
      ? state[1].sort((a, b) => a.set_release > b.set_release)
      : [];

  let arr = [];

  for (let set in sort_sets) {
    arr.push({
      set_id: sort_sets[set].scry_set_id,
      setname: sort_sets[set].set_name,
      banned: sort_cards.filter(
        (card) => card.card_set === sort_sets[set].scry_set_id
      ),
      limited: [],
    });
  }

  useEffect(() => {
    setState(data);
  }, [data]);

  console.log("buildview is repeating");

  return arr;
};

export default useBuildViewList;
