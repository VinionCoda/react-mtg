import { useState, useEffect } from "react";

import ViewTypeCards from "./ViewTypeCards";
import ViewTypeList from "./ViewTypeList";
import ViewTypeTable from "./ViewTypeTable";

/* This Component Selects the view based on screne size */
const useViewSelector = (view) => {
 
  const [state, setState] = useState(<ViewTypeCards />); 

  useEffect(() => {
    if (view === "ViewTable") {
      setState(<ViewTypeTable />);
    } else if (view === "ViewList") {
      setState(<ViewTypeList/>);
    } else {
      setState(<ViewTypeCards />);
    }
  }, [view]);

  return state;
};

export default useViewSelector;
