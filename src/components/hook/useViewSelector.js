import { useState, useEffect } from "react";
import ListCards from "../functional/ListCards";
import ListItems from "../functional/ListItems";
import ListTable from "../functional/ListTable";


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
