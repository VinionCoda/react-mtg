import DrawSymbol from "./DrawSymbol";

const ManaCost = ({ mana_cost }) => {
  const reg = /[^{}]+/g;

  const str_arr = mana_cost.match(reg);

  const listItems = (str_arr ===null)? "" : str_arr.map((str , key ) => <DrawSymbol key = {key} mana_cost={str}/>);

  return <span className="mana_container">{listItems}</span>;
};

export default ManaCost;
