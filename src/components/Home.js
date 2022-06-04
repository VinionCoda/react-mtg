import Header from "./Header";
import Footer from "./Footer";

import useViewSelector from "./useViewSelector";
import ViewContext from "./ViewContext";
import useGetAllDB from "./useGetAllDB";
import SideBarUserWidget from "./SideBarUserWidget";
import ReturnToTopButton from "./ReturnToTopButton";
import JumpToWidget from "./JumpToWidget";

import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

import "../Page.css";

const Home = () => {
  const [view, setView] = useState("");

  const toggleView = () => {
    switch (view) {
      case "":
        setView("ViewTable");
        break;

      default:
        setView("");
        break;
    }
  };

  const temp = useGetAllDB(view);

  const sort_cards =
    temp.length > 0
      ? temp[0].sort((a, b) => a.card_name.localeCompare(b.card_name))
      : [];
  const sort_sets =
    temp.length > 0
      ? temp[1].sort((a, b) => a.set_release > b.set_release)
      : [];

  const rebuild = sort_sets.map((set) => {
    return {
      set_id: set.scry_set_id,
      setname: set.set_name,
      banned: sort_cards.filter((card) => card.card_set === set.scry_set_id),
      limited: [],
    };
  });

  useEffect(() => {
    const setViewLook = () => {
      if (window.innerWidth < 610) {
        setView("ViewList");
      } else if (view === "ViewList") {
        setView("");
      }
    };

    window.addEventListener("resize", setViewLook);
    setViewLook();

    return () => window.removeEventListener("resize", setViewLook);
  });

  return (
    <>
      <Header />
      <div className="body__container">
        {/* Side bar */}
        <div id="side_bar" className="side_bar">
          <Button variant="primary" onClick={toggleView}>
            <FontAwesomeIcon icon={faImage} /> {"  "}
            Toggle View
          </Button>
          <hr />
          <SideBarUserWidget />
          <hr />
          {view === "" ? <JumpToWidget setlist={rebuild} /> : ""}
        </div>

        {/* Main Container */}
        <div className="container">
          <ViewContext.Provider value={rebuild}>
            {useViewSelector(view)}
          </ViewContext.Provider>
        </div>

        {/* Side bar */}
        <div id="side_bar" className="side_bar"></div>
      </div>

      <ReturnToTopButton />

      <Footer />
    </>
  );
};
export default Home;
