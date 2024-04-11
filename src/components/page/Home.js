import Header from "../functional/Header";
import Footer from "../functional/Footer";

import useViewSelector from "../hook/useViewSelector";
import ViewContext from "../functional/ViewContext";
import SideBarUserWidget from "../functional/SideBarUserWidget";
import ReturnToTopButton from "../functional/ReturnToTopButton";
import JumpToWidget from "../functional/JumpToWidget";

import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { buildViewData } from "../functional/ViewContext";
import "../../Page.css";


const Home = () => {
  const [view, setView] = useState("");
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState({ update: false });




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

  // const viewUpdate = localStorage.getItem("Update");


  useEffect(() => {
    if (!update.update) {
      buildViewData().then((result) => {
        setData(result);
        sessionStorage.setItem("Data", result);
        (result.length >= 0) ? setUpdate({ update: true }) : setUpdate({ update: false });
      });
    } 
  }, [update]);

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
        {/* Left Side bar */}
        <div id="side_bar" className="side_bar">
          <Button variant="primary" onClick={toggleView}>
            <FontAwesomeIcon icon={faImage} /> {"  "}
            Toggle View
          </Button>
          <hr />
          <SideBarUserWidget />
          <hr />
          {view === "" ? <JumpToWidget setlist={data} /> : ""}
        </div>

        {/* Main Container */}
        <div className="container">
          <ViewContext.Provider value={data}>
            {useViewSelector(view)}
          </ViewContext.Provider>
        </div>

        {/* Right Side bar */}
        <div id="right_side_bar" className=""></div>
      </div>

      <ReturnToTopButton />

      <Footer />
    </>
  );
};
export default Home;
