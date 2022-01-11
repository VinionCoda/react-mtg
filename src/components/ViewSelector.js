import { useState, useEffect } from "react";
import SetList from "./SetList";
import SetCardType from "./SetCardType";
import test_json from "./test_json";

/* This Component Selects the view based on screne size */
const ViewSelector = () => {
  const [state, setState] = useState(() => {
    return document.querySelector("body").offsetWidth;
  });

  

  useEffect(() => {
    const view = document.querySelector("body");
    window.addEventListener("resize", () => setState(view.offsetWidth));
    return () =>
      window.removeEventListener("resize", () => setState(view.offsetWidth));
  }, []);

  if (state < 500) {
    return (
      <div>
        <SetList sets={test_json} />
      </div>
    );
  }
  return (
    <div>
      <SetCardType bol={true} />
      <SetCardType bol={true} />
      <SetCardType bol={true} />
      <SetCardType bol={true} />
      <SetCardType bol={true} />
      <SetCardType bol={true} />
    </div>
  );
};

export default ViewSelector;
