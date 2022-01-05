import { useState, useEffect } from "react";
import symbols from "./Symbols";

const DrawSymbol = (props) => {
  const [state, setState] = useState({ backgroundImage: `url("")` });

  useEffect(() => {
    let symbol_id =props.mana_cost;
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
