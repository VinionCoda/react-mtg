import DrawSymbol from "./DrawSymbol";


//Renders symbols to represent mana cost
/* const ManaCost = ({ mana_cost }) => {
  const reg = /[^{}]+/g;

  const str_arr = mana_cost.match(reg);

  const listItems = (str_arr ===null)? "" : str_arr.map((str , key ) => <DrawSymbol key = {key} mana_cost={str}/>);

  return <span className="mana_container">{listItems}</span>;
}; */


const ManaCost = ({ mana_cost }) => {
  const reg = /[^{}]+/g;

  // Check if the input string contains "//" delimiter
  if (mana_cost.includes(" // ")) {
    const manaCostParts = mana_cost.split(" // ");
    const str_arr = manaCostParts.map((arr)=>(arr.match(reg)));
    const listItems = str_arr.map((arr)=>(arr=== null) ? "" : arr.map((str, key) => <DrawSymbol key={key} mana_cost={str} />));
    return <span className="mana_container">{listItems[0]}{"  //  "}{listItems[1]} </span>;
  }
  else {
    const str_arr = mana_cost.match(reg);

    const listItems = (str_arr === null) ? "" : str_arr.map((str, key) => <DrawSymbol key={key} mana_cost={str} />);

    return <span className="mana_container">{listItems}</span>;
  }

}


export default ManaCost;
