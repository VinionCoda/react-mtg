import { useEffect, useState } from "react";

const BlockListItem = (card) => {
  const [svg, setSvg] = useState("");
  const [name, setName] = useState("");
  const [mana, setMana] = useState("");

  useEffect(() => {
    setName(card.card_name);
    setSvg(card.set_id);
    setMana(`${card.mana_cost}`);
  }, [card]);

  return (
    <span>
      <img src={svg} alt="" /> {name} {mana}
    </span>
  );
};

BlockListItem.defaultProps = {
  card: {
    card_name: "Austere Command",
    set_id:
      "https://c2.scryfall.com/file/scryfall-symbols/sets/cmr.svg?1639976400",
    mana_cost: "{4}{W}{W}",
  },
};

export default BlockListItem;
