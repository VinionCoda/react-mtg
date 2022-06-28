import { useState, useEffect } from "react";
import symbols from "./Symbols";

//Creates the image for mana symbol
const DrawSymbol = (props) => {
  const [state, setState] = useState({ backgroundImage: `url("")` });

  useEffect(() => {
    let temp_id =props.mana_cost;
    let symbol_id = temp_id.replace(/\//g, '');
    const symbol_obj = symbols.find((obj) => {
      return obj[symbol_id];
    });
  
    const symbol_data = symbol_obj[symbol_id].url;
    const symbol_style = { backgroundImage: 'url("' + symbol_data + '")' };
    setState(symbol_style);
  }, [props]);

  return <span style={state} className="card-symbol"></span>;
};

DrawSymbol.defaultProps = {
  mana_cost: "0",
  
};

export default DrawSymbol;
