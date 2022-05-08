import Header from "./Header";
import Footer from "./Footer";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import LoginStatus from "./LoginStatus";
import useViewSelector from "./useViewSelector";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faTable, faList } from "@fortawesome/free-solid-svg-icons";

import "../Page.css";

const Home = () => {
  const [view, setView] = useState("");

  return (
    <>
      <Header />
      <div className="body__container">
        {/* Main side bar */}

        <div id="side_bar" className="side_bar">
          <div className="side_selector">
            <LoginButton />{" "}
            <LogoutButton />{" "}
            <LoginStatus />{" "}
            <button
              onClick={() => {
                setView("");
              }}
            >
              <FontAwesomeIcon icon={faImage} />
            </button>{" "}
            <button
              onClick={() => {
                setView("ViewList");
              }}
            >
              <FontAwesomeIcon icon={faList} />
            </button>{" "}
            <button
              onClick={() => {
                setView("ViewTable");
              }}
            >
              <FontAwesomeIcon icon={faTable} />
            </button>
          </div>
        </div>

        <div className="container">{useViewSelector(view)}</div>
      </div>
      <button id="myBtn" title="Go to top">
        Top
      </button>
      <Footer />
    </>
  );
};
export default Home;
