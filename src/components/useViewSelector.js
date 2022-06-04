import { useState, useEffect } from "react";
import ListCards from "./ListCards";
import ListItems from "./ListItems";
import ListTable from "./ListTable";


/* This Component Selects the view based on screne size */
const useViewSelector = (view) => {
  const [state, setState] = useState(<ListCards />);

  useEffect(() => {
    if (view === "ViewTable") {
      setState(<ListTable />);
    } else if (view === "ViewList") {
      setState(<ListItems />);
    } else {
      setState( <div id="cardcontainer"> <ListCards /></div> );
    }
  }, [view]);

  return  state ;
};

export default useViewSelector;
