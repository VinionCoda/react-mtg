import Header from "../functional/Header";
import Footer from "../functional/Footer";

import useViewSelector from "../hook/useViewSelector";
import ViewContext from "../functional/ViewContext";
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
  
    const toggleView = () => {
      setView(prevView => prevView === "" ? "ViewTable" : "");
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const cachedData = JSON.parse(sessionStorage.getItem("Data"));
          if (cachedData && cachedData.length > 0) {
            setData(cachedData);
          } else {
            const result = await buildViewData();
            setData(result);
            sessionStorage.setItem("Data", JSON.stringify(result));
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []);
  
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
    }, [view]);

  return (
    <>
      <Header />

      {/* Search Bar */}
      <div className="search">
        <JumpToWidget setlist={data} />
        <Button variant="outlined" onClick={toggleView}>
          <FontAwesomeIcon icon={faImage} /> {"  "}
          Toggle View
        </Button>
      </div>

      <div className="body__container">

        {/* Left Side bar */}
        <div id="left_side_bar" className="side_bar">

        </div>

        {/* Main Container */}
        <div className="container">         
          <ViewContext.Provider value={data}>
            {useViewSelector(view)}
          </ViewContext.Provider>
        </div>

        {/* Right Side bar */}
         <div id="right_side_bar" className="side_bar"></div> 

      </div>

      <Footer />
      <ReturnToTopButton />
    </>
  );
};
export default Home;
