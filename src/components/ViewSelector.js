import { useState, useEffect } from "react";
import SetList from "./SetList";
import SetCardType from "./SetCardType";

/* This Component Selects the view based on screne size */
const ViewSelector = () => {
  const [state, setState] = useState(() => {
    return document.querySelector("body").offsetWidth;
  });

  const cardlist = [
    { id: "612beb8f-2ab1-4a8b-84c5-c47d19d400ab" },
    { id: "8d74a469-c71d-4773-99d3-5456b31df424" },
    { id: "ccb4d9a3-e7f6-41e2-9545-4682efd71f46" },
    { id: "7002a87b-a55f-42ec-b247-119a3229129f" },
    { id: "d99a9a7d-d9ca-4c11-80ab-e39d5943a315" },
  ];

  useEffect(() => {
    const view = document.querySelector("body");
    window.addEventListener("resize", () => setState(view.offsetWidth));
    return () =>
      window.removeEventListener("resize", () => setState(view.offsetWidth));
  }, []);

  if (state < 500) {
    return (
      <div>
        <SetList cardlist={cardlist} />
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
